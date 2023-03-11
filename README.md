# 나의 하루일기
:notebook: ***하루 일기를 작성하고, 시간 순대로 일기 목록을 확인할 수 있는 웹 일기장 서비스.*** <br />

배포 주소 : https://firsttest-c11d5.web.app/

+ React를 기반으로 SPA 구현, 기능별 커스텀 훅 적용. 
+ firebase를 이용하여 로그인, 회원가입 기능 구현.
+ 작성한 일기를 데이터베이스에 저장하고, 일기 목록에 작성한 날짜 순서대로 UI 표시.
+ 일기 목록에 있는 일기 데이터 삭제 기능 구현
+ OpenWeather에서 날씨 api를 불러와 도시에 맞게 날씨 표시.
+ Styled-Components로 React 컴포넌트 스타일 rngus.

### 로컬 환경에서 프로젝트 구동
1. ```npm start```

---

## 1. 기술스택(Stack)
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white">
<img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">

---

## 2. 페이지 미리보기(Preview)
<figure>
  <figcaption>홈 화면</figcaption>
  <img src="https://user-images.githubusercontent.com/112460273/224097974-3902f293-4f3a-4695-84f7-d4139911a0f8.png" width="50%" />
</figure>
<figure>
  <figcaption>로그인 화면</figcaption>
  <img src="https://user-images.githubusercontent.com/112460273/224098175-655b5d2a-6af9-4e60-a101-4a78f49ce5e4.png" width="50%" />
</figure>
<figure>
  <figcaption>로그아웃 화면</figcaption>
  <img src="https://user-images.githubusercontent.com/112460273/224098328-a3285eb7-bc93-4937-8f9b-fccf69a871ac.png" width="50%" />
</figure>

----

## 트러블 슈팅
작성된 각 일기마다 업로드 시간이 자동적으로 UI에 표시되도록 하고 싶었다.

먼저 업로드 시간 순서대로 일기가 나열될 수 있도록 업로드 시간울 받는 코드를 작성했다. 그 과정에서 firebase 메서드를 이용해 timeStamp형식으로 시간을 받았고, createdTime 변수에 담았다.
```javascript
// useFirestore.jsx
const createdTime = timeStamp.fromDate(new Date());
```

데이터베이스에는
+ createdTime
+ title(일기제목)
+ text(일기내용)
+ uid(유저식별자)가 하나의 세트로 documents라는 변수에 담겨 저장된다. <br />

**Home.jsx**에서 documents를 콘솔에 찍어보면 객체 형태로 해당 항목들이 보인다.<br/>
업로드 시간이 담긴 createdTime을 확인해보니 nanoseconds와 seconds라는 항목이 있었다. number 형태의 숫자만 있었다.
<br/>
<br/>
1. 일단 일기 목록이 구현되어 있는 **DiaryList.jsx**에서 ```{item.createdTime}```을 마지막에 추가했다.(여기서 item은 Home.jsx에서 props로 받는 documents를 의미한다.) <br />

다음과 같은 오류가 발생했다.

<img src="https://user-images.githubusercontent.com/112460273/224384358-0a8297b9-cf49-45cd-b334-1d3c487a2974.png" width="40%" />

2. createdTime도 객체 형태로서 nanoseconds와 seconds를 담고있기 때문에 객체 그대로의 출력은 안됐고, 원시타입 형태의 출력이 필요하다고 생각했다. 다음 코드를 입력했다. ```{item.createdTime.seconds}```

<p>아래 사진처럼 출력은 잘 되었지만 무엇을 뜻하는지 모르는 숫자가 출력되었다.</p>
<img src="https://user-images.githubusercontent.com/112460273/224385138-8f209e4f-f6e6-4cda-9ff3-9d514b5b0ccc.png" width="30%" />

timeStamp 형식의 시간은 유닉스 시간을 의미한다. 유닉스 시간은 컴퓨터에서 사용하는 시간 표현 방식이며, UTC(협정 세계시)기준 1970년 1월 1일 00:00:00로부터 몇 초가 지났는지를 나타낸 것이다.
<br/>
<br/>
3. 이를 변환해줄 코드가 필요했다. ```{Date(item.createdTime.seconds)}```
```Date()``` 함수를 사용했지만 잘못된 사용이었다. 단순히 문자열로 반환하는 함수여서 제대로된 형태로 출력할 수 없었다.

<img src="https://user-images.githubusercontent.com/112460273/224385531-f1f8a5c4-12db-4c19-a855-14978683f4d6.png" width="30%" />

4. 밀리초 단위로 바꿔서 ```new Date()```에 담아야 했다. <br />
먼저 ```convertTimestamp```함수를 만들고, 밀리초로 변환한 변수와 ```new Date()```를 이용해서 객체로 변환하는 코드를 작성했다.
```javascript
const convertTimestamp = (time) => {
  // 밀리초로 변환
  let dateInMillis = time * 1000
  let date = new Date(dateInMillis)
};
```

```date```에 담긴 값으로 날짜와 시간을 출력할 수 있다. <br />
```toLocaleDateString()```과 ```toLocaleTimeString()``` 메서드를 사용했다.

```javascript
const convertTimestamp = (time) => {
  let dateInMillis = time * 1000;
  let date = new Date(dateInMillis);
  let myDate = date.toLocaleDateString(); // "연도. 월. 일"
  let myTime = date.toLocaleTimeString(); // "오전/오후 시:분:초"
  return myDate + " " + myTime
};
```
반환값으로 공백을 추가하여 ```myDate + " " + myTime``` 출력되도록 한다.

마지막으로 ```item.createdTime.seconds```를 ```convertTimestamp```함수의 파라미터로 입력했다.
<img src="https://user-images.githubusercontent.com/112460273/224475857-11e091e8-12c0-49af-b067-7712e0418e17.png" width="30%" />

최종적으로 날짜, 시간이 잘 출력된다.
