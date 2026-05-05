# 이경세 마케팅 연구소 - Firebase 연동 홈페이지

Firebase Firestore + Storage + Authentication을 활용한 블로그 기능이 있는 마케팅 연구소 홈페이지입니다.

## 📁 파일 구조

```
k-marketinglab-firebase/
├── index.html          # 메인 홈페이지 (블로그 글 표시)
├── admin.html          # 관리자 페이지 (글 작성/삭제)
├── firebase-init.js    # Firebase 설정 파일
├── firebase-config.js  # Firebase 설정 (백업)
└── README.md           # 이 파일
```

## 🔥 Firebase 설정 완료 항목

✅ **Firestore Database** - 테스트 모드 (Seoul)
✅ **Authentication** - 이메일/비밀번호 로그인
✅ **Storage** - 이미지 업로드 (ASIA1)
✅ **관리자 계정** - `admin@k-marketinglab.com`

## 🚀 로컬 테스트 방법

### 1. 파일 다운로드
모든 파일을 한 폴더에 다운로드하세요.

### 2. 로컬 서버 실행 (필수!)
Firebase 모듈을 사용하려면 **로컬 서버**가 필요합니다. 파일을 더블클릭해서 여는 것은 작동하지 않습니다.

**방법 1: Python 서버 (추천)**
```bash
# Python 3가 설치되어 있다면
cd k-marketinglab-firebase
python -m http.server 8000
```
그 다음 브라우저에서 `http://localhost:8000` 접속

**방법 2: VS Code Live Server**
- VS Code에서 폴더 열기
- `index.html` 우클릭 → "Open with Live Server"

**방법 3: Node.js http-server**
```bash
npx http-server -p 8000
```

### 3. 테스트

**메인 페이지 (`index.html`)**
- 블로그 글이 Firestore에서 자동으로 불러와집니다
- 카테고리 필터 기능
- 글 클릭 시 모달로 상세 보기

**관리자 페이지 (`admin.html`)**
1. `admin@k-marketinglab.com` + 설정한 비밀번호로 로그인
2. 새 글 작성
3. 이미지 업로드 (Storage에 저장)
4. 발행된 글 목록 확인 및 삭제

## 📤 배포 방법

### Vercel 배포 (추천)

1. **GitHub에 코드 업로드**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/k-marketinglab.git
git push -u origin main
```

2. **Vercel 배포**
- https://vercel.com 접속
- "Import Project" 클릭
- GitHub 레포지토리 선택
- "Deploy" 클릭

3. **커스텀 도메인 연결**
- Vercel 대시보드 → Settings → Domains
- `k-marketinglab.com` 추가
- DNS 설정 (Vercel에서 제공하는 정보 참고)

### Netlify 배포

1. https://netlify.com 접속
2. "Add new site" → "Import an existing project"
3. GitHub 레포지토리 연결
4. "Deploy site" 클릭

## 🔒 Firebase 보안 규칙 수정 (중요!)

현재는 **테스트 모드**로 되어 있습니다. 실제 운영 시 보안 규칙을 수정해야 합니다.

### Firestore 규칙

Firebase Console → Firestore Database → 규칙 탭

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // blogPosts: 모두 읽기 가능, 인증된 사용자만 쓰기
    match /blogPosts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage 규칙

Firebase Console → Storage → 규칙 탭

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /blog-images/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📝 사용 방법

### 블로그 글 작성

1. `admin.html` 접속
2. 로그인
3. 글 제목, 카테고리, 본문 입력
4. (선택) 이미지 업로드 → URL 복사 → 본문에 삽입
5. "발행하기" 클릭

### 이미지 삽입 예시

```html
<p>이미지 설명</p>
<img src="https://firebasestorage.googleapis.com/..." alt="설명" class="w-full rounded-lg my-4">
```

## 🛠️ 커스터마이징

### 색상 변경
`index.html`과 `admin.html`에서 `emerald-600`을 다른 Tailwind 색상으로 변경:
- `blue-600` (파랑)
- `purple-600` (보라)
- `rose-600` (분홍)

### 카테고리 추가
`admin.html`의 `<select id="postCategory">` 부분에 옵션 추가

```html
<option value="새카테고리">새카테고리</option>
```

`index.html`의 필터 버튼도 추가:
```html
<button onclick="filterPosts('새카테고리')" class="filter-btn px-4 py-2 rounded-lg border">새카테고리</button>
```

## 🐛 문제 해결

### "Firebase is not defined" 에러
→ 로컬 서버를 통해 실행하지 않았습니다. 위의 "로컬 테스트 방법" 참고

### 블로그 글이 안 보임
→ Firebase Console에서 Firestore에 `blogPosts` 컬렉션이 있는지 확인
→ 브라우저 개발자 도구(F12) → Console 탭에서 에러 확인

### 이미지 업로드 실패
→ Firebase Storage가 활성화되어 있는지 확인
→ Storage 규칙이 write를 허용하는지 확인

### 로그인 실패
→ Authentication에서 이메일/비밀번호가 올바른지 확인
→ 이메일 형식이 맞는지 확인 (`@` 포함)

## 📞 지원

문제가 있으시면 Firebase Console의 "지원" 메뉴를 확인하거나,
Firebase 공식 문서를 참고하세요: https://firebase.google.com/docs

---

**제작:** 이경세 마케팅 연구소  
**버전:** 1.0.0  
**최종 업데이트:** 2026년 5월
