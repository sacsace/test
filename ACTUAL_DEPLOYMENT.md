# 🚀 실제 배포 진행

## ✅ 현재 상태
- Git 커밋 완료 (3개 커밋)
- 프론트엔드 빌드 완료
- 백엔드 서버 테스트 완료
- 배포 가이드 준비 완료

## 🐙 GitHub 저장소 생성 (2분)

### 1단계: GitHub에서 저장소 생성
1. https://github.com 접속
2. "New repository" 클릭
3. 저장소 정보 입력:
   - **Repository name**: `login-system`
   - **Description**: `Login system for Korean customer - India development team`
   - **Visibility**: Public
   - **Initialize**: 체크하지 않음
4. "Create repository" 클릭

### 2단계: 로컬에서 GitHub 연결
```bash
# YOUR_USERNAME을 실제 GitHub 사용자명으로 변경
git remote add origin https://github.com/YOUR_USERNAME/login-system.git
git push -u origin main
```

## 🚂 Railway 백엔드 배포 (3분)

### 1단계: Railway 프로젝트 생성
1. https://railway.app 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. "Deploy from GitHub repo" 선택
5. `login-system` 저장소 선택

### 2단계: 환경변수 설정
Railway 대시보드 → Variables 탭에서 설정:
```
JWT_SECRET=india_production_secret_2024
NODE_ENV=production
TZ=Asia/Kolkata
```

### 3단계: PostgreSQL 데이터베이스 추가
1. Railway 프로젝트에서 "New" 클릭
2. "Database" → "PostgreSQL" 선택
3. 자동으로 DATABASE_URL 환경변수 설정됨

### 4단계: 배포 확인
- Railway에서 제공하는 URL 확인
- 예: `https://your-app-name.railway.app`

## ▲ Vercel 프론트엔드 배포 (2분)

### 1단계: Vercel 프로젝트 생성
1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. "Import Git Repository" 선택
5. `login-system` 저장소 선택

### 2단계: 프로젝트 설정
- **Framework Preset**: Create React App
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### 3단계: 환경변수 설정
Vercel 대시보드 → Settings → Environment Variables에서 설정:
```
REACT_APP_API_URL=https://your-railway-app.railway.app/api
```

### 4단계: 배포 확인
- Vercel에서 제공하는 URL 확인
- 예: `https://your-app-name.vercel.app`

## 🔗 CORS 설정 업데이트

Railway 백엔드에서 Vercel 도메인을 CORS에 추가:
1. Railway 대시보드 → Variables
2. 추가:
   ```
   CORS_ORIGIN=https://your-app-name.vercel.app
   ```

## 📱 테스트

### 테스트 계정
- **사용자명**: admin, **비밀번호**: password123
- **사용자명**: testuser, **비밀번호**: password123

### 테스트 단계
1. Vercel URL로 접속
2. 로그인 페이지 확인
3. 테스트 계정으로 로그인
4. 대시보드 확인
5. 회원가입 테스트

## 💰 비용
- **GitHub**: 무료
- **Vercel**: 무료 플랜
- **Railway**: 무료 플랜 (월 $5 크레딧)
- **총 비용**: 무료로 시작!

## ⚡ 배포 시간
- **GitHub**: 2분
- **Railway**: 3분
- **Vercel**: 2분
- **총 시간**: 7분

## 🎯 완료 후 확인사항
- [ ] GitHub 저장소 생성 완료
- [ ] Railway 백엔드 배포 완료
- [ ] Vercel 프론트엔드 배포 완료
- [ ] 로그인 테스트 성공
- [ ] API 연동 확인
- [ ] 한국어 UI 정상 표시

## 🌏 인도 개발팀 최적화
- **시간대**: Asia/Kolkata (IST)
- **언어**: 개발(영어), UI(한국어)
- **고객**: 한국 기업
- **배포 시간**: IST 오전 10시-오후 6시 권장
