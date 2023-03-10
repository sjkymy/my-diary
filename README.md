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
  <img src="https://user-images.githubusercontent.com/112460273/224097974-3902f293-4f3a-4695-84f7-d4139911a0f8.png" width="30%" />
</figure>
<figure>
  <figcaption>로그인 화면</figcaption>
  <img src="https://user-images.githubusercontent.com/112460273/224098175-655b5d2a-6af9-4e60-a101-4a78f49ce5e4.png" width="30%" />
</figure>
<figure>
  <figcaption>로그아웃 화면</figcaption>
  <img src="https://user-images.githubusercontent.com/112460273/224098328-a3285eb7-bc93-4937-8f9b-fccf69a871ac.png" width="30%" />
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

일단 일기 목록이 구현되어 있는 **DiaryList.jsx**에서 ```{item.createdTime}```을 마지막에 추가했다.(여기서 item은 Home.jsx에서 props로 받는 documents를 의미한다.) <br />
다음과 같은 오류가 발생했다.

<img src="https://user-images.githubusercontent.com/112460273/224384358-0a8297b9-cf49-45cd-b334-1d3c487a2974.png" width="40%" />

createdTime도 객체 형태로 nanoseconds와 seconds를 담고있기 때문에 객체 그대로의 출력은 안됐고, 원시타입 형태의 출력이 필요하다고 생각해서 key값(nanoseconds 혹은 seconds)만 입력했다.

다음 코드를 입력했다. ```{item.createdTime.seconds}```

<p>아래 사진처럼 출력은 잘 되었지만 무엇을 뜻하는지 모르는 숫자가 출력되었다.</p>
<img src="https://user-images.githubusercontent.com/112460273/224385138-8f209e4f-f6e6-4cda-9ff3-9d514b5b0ccc.png" width="30%" />

<img src="https://user-images.githubusercontent.com/112460273/224385531-f1f8a5c4-12db-4c19-a855-14978683f4d6.png" width="30%" />

