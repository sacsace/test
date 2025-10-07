# GitHub 저장소 생성 및 푸시 가이드

## 🐙 GitHub 저장소 생성

### 1단계: GitHub에서 새 저장소 생성
1. https://github.com 접속
2. "New repository" 클릭
3. 저장소 정보 입력:
   - **Repository name**: `login-system`
   - **Description**: `Login system for Korean customer - India development team (Vercel + Railway)`
   - **Visibility**: Public (Railway 무료 플랜 사용 가능)
   - **Initialize**: 체크하지 않음 (이미 로컬에 코드가 있음)

### 2단계: 로컬 저장소와 GitHub 연동
```bash
# GitHub 저장소와 연결
git remote add origin https://github.com/YOUR_USERNAME/login-system.git

# 브랜치 이름을 main으로 변경
git branch -M main

# GitHub에 푸시
git push -u origin main
```

### 3단계: 확인
- GitHub 저장소 페이지에서 파일들이 업로드되었는지 확인
- README.md가 자동으로 표시되는지 확인

## 📋 저장소 정보

### 저장소 이름
`login-system`

### 설명
Login system for Korean customer - India development team (Vercel + Railway)

### 주요 파일
- `README.md` - 인도 개발팀용 가이드
- `VERCEL_RAILWAY_DEPLOYMENT.md` - 분리 배포 가이드
- `client/` - React 프론트엔드 (Vercel 배포)
- `server/` - Node.js 백엔드 (Railway 배포)
- `database/` - PostgreSQL 스크립트

### 아키텍처
- **프론트엔드**: React (Vercel 호스팅)
- **백엔드**: Node.js + Express (Railway 호스팅)
- **데이터베이스**: PostgreSQL (Railway 제공)
- **배포**: 분리 배포 (Vercel + Railway)

### 개발팀 정보
- **개발팀**: India Development Team
- **고객**: Korean Company
- **시간대**: Asia/Kolkata (IST)
- **언어**: 개발(영어), UI(한국어)

## 🚀 다음 단계: 분리 배포

### Vercel 배포 (프론트엔드)
1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "New Project" → "Import Git Repository"
4. `login-system` 저장소 선택
5. Root Directory: `client` 설정
6. 환경변수 설정: `REACT_APP_API_URL=https://your-railway-app.railway.app/api`

### Railway 배포 (백엔드)
1. https://railway.app 접속
2. GitHub 계정으로 로그인
3. "New Project" → "Deploy from GitHub repo"
4. `login-system` 저장소 선택
5. 환경변수 설정:
   ```
   JWT_SECRET=your_super_secret_jwt_key_2024
   NODE_ENV=production
   TZ=Asia/Kolkata
   ```
6. PostgreSQL 데이터베이스 추가

## 💡 팁
- 저장소를 Public으로 설정하면 Railway 무료 플랜 사용 가능
- Private 저장소는 Railway Pro 플랜 필요
- 인도 개발팀이 접근할 수 있도록 권한 설정 확인
- Vercel과 Railway 모두 GitHub 연동으로 자동 배포 가능