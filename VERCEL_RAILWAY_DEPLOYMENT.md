# Vercel + Railway 분리 배포 가이드

## 🎯 아키텍처 개요

### 프론트엔드: Vercel
- **서비스**: React 앱 호스팅
- **장점**: CDN, 자동 HTTPS, 빠른 배포
- **비용**: 무료 플랜 제공

### 백엔드: Railway
- **서비스**: Node.js API 서버
- **장점**: PostgreSQL 데이터베이스, 환경변수 관리
- **비용**: 무료 플랜 (월 $5 크레딧)

## 🚀 배포 순서

### 1단계: 백엔드 배포 (Railway)

#### Railway 설정
1. https://railway.app 접속
2. GitHub 계정으로 로그인
3. "New Project" → "Deploy from GitHub repo"
4. 저장소 선택 (server 폴더만 배포)

#### 환경변수 설정
```
JWT_SECRET=your_super_secret_jwt_key_2024
NODE_ENV=production
TZ=Asia/Kolkata
CORS_ORIGIN=https://your-app-name.vercel.app
```

#### PostgreSQL 데이터베이스 추가
1. Railway 프로젝트에서 "New" 클릭
2. "Database" → "PostgreSQL" 선택
3. 자동으로 DATABASE_URL 설정됨

### 2단계: 프론트엔드 배포 (Vercel)

#### Vercel 설정
1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. 저장소 선택 (client 폴더만 배포)

#### 환경변수 설정
```
REACT_APP_API_URL=https://your-railway-app.railway.app/api
```

#### 빌드 설정
- **Framework Preset**: Create React App
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### 3단계: CORS 설정 업데이트

Railway 백엔드에서 Vercel 도메인을 CORS에 추가:
```
CORS_ORIGIN=https://your-app-name.vercel.app
```

## 🔧 로컬 개발환경

### 프론트엔드 실행
```bash
cd client
npm install
npm start
```

### 백엔드 실행
```bash
cd server
npm install
npm run dev
```

### 환경변수 설정 (로컬)
**client/.env.local**
```
REACT_APP_API_URL=http://localhost:5000/api
```

**server/.env**
```
JWT_SECRET=local_dev_secret
NODE_ENV=development
PORT=5000
TZ=Asia/Kolkata
```

## 📱 테스트 계정
- 사용자명: admin, 비밀번호: password123
- 사용자명: testuser, 비밀번호: password123

## 💰 비용 비교

| 서비스 | 무료 플랜 | 유료 플랜 |
|--------|-----------|-----------|
| **Vercel** | 무제한 | 월 $20부터 |
| **Railway** | 월 $5 크레딧 | 월 $5부터 |
| **총 비용** | 무료 | 월 $25부터 |

## ⚡ 배포 시간
- **Vercel**: 1-2분
- **Railway**: 3-5분
- **총 배포 시간**: 5-7분

## 🔄 업데이트 프로세스

### 프론트엔드 업데이트
1. 코드 수정
2. GitHub에 푸시
3. Vercel 자동 배포

### 백엔드 업데이트
1. 코드 수정
2. GitHub에 푸시
3. Railway 자동 배포

## 🌏 인도 개발팀 고려사항

### 시간대 설정
- **Vercel**: UTC (자동)
- **Railway**: Asia/Kolkata 설정
- **UI 표시**: IST 기준

### 언어 설정
- **코드**: 영어
- **UI**: 한국어
- **에러 메시지**: 한국어

### 배포 권장 시간
- **IST 오전 10시-오후 6시**
- **한국 고객 업무시간 고려**

## 🎯 장점

### 분리 배포의 이점
- ✅ **독립적 배포**: 프론트엔드와 백엔드 독립 배포
- ✅ **스케일링**: 각각 독립적 스케일링
- ✅ **비용 최적화**: 필요한 서비스만 사용
- ✅ **성능 최적화**: CDN 활용
- ✅ **관리 편의성**: 각각 최적화된 도구 사용

### Vercel 장점
- ✅ **CDN**: 전 세계 빠른 로딩
- ✅ **자동 HTTPS**: SSL 인증서 자동 설정
- ✅ **미리보기**: PR별 미리보기 배포
- ✅ **Analytics**: 성능 분석 제공

### Railway 장점
- ✅ **PostgreSQL**: 데이터베이스 자동 제공
- ✅ **환경변수**: 쉬운 환경변수 관리
- ✅ **로깅**: 실시간 로그 확인
- ✅ **모니터링**: 서버 상태 모니터링
