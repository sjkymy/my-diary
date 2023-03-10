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

---

## 트러블 슈팅
일기 목록에 자동적으로 작성한 시간을 입력하고 싶었다.

Home.jsx에서 일기 목록에 documents라는 이름으로 props를 뿌려준다. documents를 콘솔에 찍어봤다.
