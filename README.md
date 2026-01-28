# To-Do 캘린더 웹 애플리케이션

반응형 To-Do 캘린더 애플리케이션입니다. HTML, CSS, JavaScript만을 사용하여 제작되었으며, Firebase를 데이터베이스로 사용합니다.

## 주요 기능

- 📅 **캘린더 뷰**: 월별 캘린더로 날짜별 할 일을 시각적으로 확인
- ✅ **할 일 관리**: 할 일 추가, 수정, 삭제, 완료 처리
- 🔒 **비밀번호 기반 관리**: 관리 비밀번호로 할 일 수정/삭제 제어
- 👁️ **조회 모드**: 비밀번호 없이도 할 일 조회 가능
- 💾 **데이터 저장**: Firebase Firestore를 통한 실시간 데이터 동기화
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화

## 시작하기

### 1. Firebase 프로젝트 설정

Firebase 설정은 이미 `firebase-config.js`에 적용되어 있습니다. 필요시 수정하세요.

### 2. Firestore Database 설정

1. Firebase Console에서 Firestore Database 메뉴로 이동
2. 데이터베이스 만들기 클릭 (이미 생성되어 있다면 생략)
3. 테스트 모드로 시작 선택 (개발 중)
4. 위치 선택 (가장 가까운 리전)

### 3. Firestore 보안 규칙 설정

Firestore Database > 규칙 탭에서 다음 규칙을 설정하세요 (모든 사용자가 읽고 쓸 수 있도록):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, write: if true;
    }
  }
}
```

**주의**: 프로덕션 환경에서는 보안 규칙을 더 엄격하게 설정하는 것을 권장합니다.

### 4. 관리 비밀번호 설정

`app.js` 파일의 `ADMIN_PASSWORD` 상수를 원하는 비밀번호로 변경하세요:

```javascript
const ADMIN_PASSWORD = 'your-password-here';
```

### 5. 실행

1. 웹 서버를 통해 `index.html` 파일을 열기
   - 로컬 개발: VS Code의 Live Server 확장 사용
   - 또는 Python: `python -m http.server 8000`
   - 또는 Node.js: `npx http-server`

2. 브라우저에서 `http://localhost:8000` 접속

## 사용 방법

1. **비밀번호 입력**: 처음 접속 시 관리 비밀번호를 입력하거나, 비밀번호 없이 조회 모드로 진행
   - 관리 비밀번호 입력: 할 일 추가/수정/삭제 가능
   - 비밀번호 없이 진행: 할 일 조회만 가능

2. **날짜 선택**: 캘린더에서 날짜를 클릭하여 해당 날짜의 할 일을 확인

3. **할 일 추가** (관리 모드만): "+ 추가" 버튼을 클릭하여 새로운 할 일 추가

4. **할 일 수정** (관리 모드만): 할 일 항목을 클릭하여 수정 모달 열기

5. **할 일 완료** (관리 모드만): 체크박스를 클릭하여 완료 상태 토글

6. **할 일 삭제** (관리 모드만): 할 일 수정 모달에서 삭제 버튼 클릭

7. **잠금**: 헤더의 "잠금" 버튼을 클릭하여 관리 모드 종료

## 파일 구조

```
to-doWeb/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── app.js              # 메인 애플리케이션 로직
├── firebase-config.js  # Firebase 설정 파일
└── README.md           # 프로젝트 문서
```

## 기술 스택

- **HTML5**: 구조 마크업
- **CSS3**: 스타일링 및 반응형 디자인
- **JavaScript (ES6+)**: 애플리케이션 로직
- **Firebase Firestore**: 실시간 데이터베이스
- **LocalStorage**: 관리 비밀번호 세션 저장

## 브라우저 지원

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 라이선스

이 프로젝트는 개인 사용 목적으로 제작되었습니다.

