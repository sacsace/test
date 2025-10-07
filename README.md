# Login System - Vercel + Railway 분리 배포

간단한 로그인 시스템입니다. 프론트엔드는 Vercel, 백엔드는 Railway로 분리 배포됩니다.

## 🏗️ 아키텍처

### 프론트엔드: Vercel
- **기술**: React
- **호스팅**: Vercel (CDN, 자동 HTTPS)
- **비용**: 무료 플랜

### 백엔드: Railway
- **기술**: Node.js + Express
- **데이터베이스**: PostgreSQL
- **호스팅**: Railway
- **비용**: 무료 플랜 (월 $5 크레딧)

## 🚀 빠른 배포

### 1단계: 백엔드 배포 (Railway)
```bash
# Railway에서 GitHub 저장소 연결
# 자동으로 server/ 폴더 배포
```

### 2단계: 프론트엔드 배포 (Vercel)
```bash
# Vercel에서 GitHub 저장소 연결
# 자동으로 client/ 폴더 배포
```

### 3단계: 환경변수 설정
**Vercel 환경변수:**
```
REACT_APP_API_URL=https://your-railway-app.railway.app/api
```

**Railway 환경변수:**
```
JWT_SECRET=your_super_secret_jwt_key_2024
NODE_ENV=production
TZ=Asia/Kolkata
```

## 💻 로컬 개발환경

### 전체 실행
```bash
# 모든 의존성 설치
npm run install-all

# 개발 서버 실행 (프론트엔드 + 백엔드)
npm run dev
```

### 개별 실행
```bash
# 백엔드만 실행
npm run server

# 프론트엔드만 실행
npm run client
```

## 📱 테스트 계정
- 사용자명: admin, 비밀번호: password123
- 사용자명: testuser, 비밀번호: password123

## 🌏 인도 개발팀 설정

### 시간대 관리
- **개발 환경**: Asia/Kolkata (IST)
- **서버 로그**: UTC 기준
- **UI 표시**: IST 기준

### 언어 설정
- **코드 주석**: 영어 (개발팀용)
- **UI 텍스트**: 한국어 (고객용)
- **에러 메시지**: 한국어
- **커밋 메시지**: 영어

### 배포 고려사항
- **권장 배포 시간**: IST 오전 10시-오후 6시
- **고객 업무시간**: 한국 시간대 고려
- **서버 지역**: 아시아 서버 최적화

## 📁 프로젝트 구조
```
├── client/          # React 프론트엔드 (Vercel 배포)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── server/          # Node.js 백엔드 (Railway 배포)
│   ├── index.js
│   ├── package.json
│   └── env.example
├── database/        # PostgreSQL 스크립트
└── docs/           # 배포 가이드
```

## 🔗 API 엔드포인트
- POST /api/login - 로그인
- POST /api/register - 회원가입
- GET /api/user - 사용자 정보 조회
- GET /api/health - 서버 상태 확인

## 💰 비용
- **Vercel**: 무료 플랜
- **Railway**: 무료 플랜 (월 $5 크레딧)
- **총 비용**: 무료로 시작 가능

## 🎯 분리 배포의 장점
- ✅ **독립적 배포**: 프론트엔드와 백엔드 독립 배포
- ✅ **스케일링**: 각각 독립적 스케일링
- ✅ **비용 최적화**: 필요한 서비스만 사용
- ✅ **성능 최적화**: CDN 활용
- ✅ **관리 편의성**: 각각 최적화된 도구 사용

## 📚 배포 가이드
- [Vercel + Railway 분리 배포 가이드](./VERCEL_RAILWAY_DEPLOYMENT.md)
- [GitHub 저장소 설정 가이드](./GITHUB_SETUP.md)

## 👥 개발팀 정보
- **개발팀**: India Development Team
- **고객**: Korean Company
- **시간대**: Asia/Kolkata (IST)
- **언어**: 개발(영어), UI(한국어)