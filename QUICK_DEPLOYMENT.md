# 🚀 즉시 배포 가이드

## 1단계: GitHub 저장소 생성 (2분)

### GitHub에서 저장소 생성:
1. https://github.com 접속
2. "New repository" 클릭
3. 저장소 정보 입력:
   - **Repository name**: `login-system`
   - **Description**: `Login system for Korean customer - India development team`
   - **Visibility**: Public
   - **Initialize**: 체크하지 않음
4. "Create repository" 클릭

### 생성된 저장소 URL 복사:
- 예: `https://github.com/YOUR_USERNAME/login-system.git`

## 2단계: 로컬에서 GitHub 연결 (1분)

**아래 명령어에서 YOUR_USERNAME을 실제 사용자명으로 변경하고 실행:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/login-system.git
git push -u origin main
```

## 3단계: Railway 백엔드 배포 (3분)

1. https://railway.app 접속
2. GitHub 계정으로 로그인
3. "New Project" → "Deploy from GitHub repo"
4. `login-system` 저장소 선택
5. 환경변수 설정:
   ```
   JWT_SECRET=india_production_secret_2024
   NODE_ENV=production
   TZ=Asia/Kolkata
   ```
6. PostgreSQL 데이터베이스 추가:
   - "New" → "Database" → "PostgreSQL"

## 4단계: Vercel 프론트엔드 배포 (2분)

1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "New Project" → "Import Git Repository"
4. `login-system` 저장소 선택
5. 설정:
   - **Root Directory**: `client`
   - **Framework Preset**: Create React App
6. 환경변수 설정:
   ```
   REACT_APP_API_URL=https://your-railway-app.railway.app/api
   ```

## 5단계: CORS 설정 업데이트 (1분)

Railway 백엔드에서 Vercel 도메인을 CORS에 추가:
1. Railway 대시보드 → Variables
2. 추가:
   ```
   CORS_ORIGIN=https://your-app-name.vercel.app
   ```

## ⚡ 총 배포 시간: 9분

## 📱 테스트 계정
- 사용자명: admin, 비밀번호: password123
- 사용자명: testuser, 비밀번호: password123

## 💰 비용
- GitHub: 무료
- Vercel: 무료 플랜
- Railway: 무료 플랜 (월 $5 크레딧)
- **총 비용: 무료!**

## 🎯 완료 후 확인사항
- [ ] GitHub 저장소 생성 완료
- [ ] Railway 백엔드 배포 완료
- [ ] Vercel 프론트엔드 배포 완료
- [ ] 로그인 테스트 성공
- [ ] API 연동 확인
