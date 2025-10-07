# Login System - India Development Team

간단한 로그인 시스템입니다. 인도 개발팀을 위해 최적화되었습니다.

## 기술 스택
- Frontend: React
- Backend: Node.js + Express
- Database: PostgreSQL
- Deployment: Railway

## 인도 개발환경 설정

### 시간대 설정
- 기본 시간대: Asia/Kolkata (IST)
- 서버 시간대: UTC (배포 환경)

### 언어 설정
- 기본 언어: 한국어 (고객 요구사항)
- 개발자 언어: 영어 (코드 주석)

## 설치 및 실행

### 로컬 개발환경
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

## 배포 (Railway)

### 1단계: GitHub 저장소 생성
```bash
git add .
git commit -m "Initial commit for India team"
git remote add origin https://github.com/yourusername/login-system.git
git push -u origin main
```

### 2단계: Railway 배포
1. https://railway.app 접속
2. GitHub 계정으로 로그인
3. "New Project" → "Deploy from GitHub repo"
4. 저장소 선택하여 자동 배포

### 3단계: PostgreSQL 데이터베이스 추가
1. Railway 프로젝트에서 "New" 클릭
2. "Database" → "PostgreSQL" 선택
3. 자동으로 DATABASE_URL 환경변수 설정됨

### 4단계: 환경변수 설정
```
JWT_SECRET=your_super_secret_jwt_key_2024
NODE_ENV=production
TZ=Asia/Kolkata
```

## 테스트 계정
- 사용자명: admin, 비밀번호: password123
- 사용자명: testuser, 비밀번호: password123

## 인도 개발팀 가이드

### 개발 규칙
1. 모든 코드 주석은 영어로 작성
2. 커밋 메시지는 영어로 작성
3. 변수명과 함수명은 영어로 작성
4. UI 텍스트는 한국어로 작성 (고객 요구사항)

### 시간대 고려사항
- 로그인 시간: IST 기준으로 표시
- 데이터베이스: UTC로 저장, 표시 시 IST로 변환
- 서버 로그: UTC 기준

### 배포 시간
- 권장 배포 시간: IST 오전 10시-오후 6시 (고객 업무시간)
- 긴급 배포: 언제든 가능

## 프로젝트 구조
```
├── client/          # React 프론트엔드
├── server/          # Node.js 백엔드
├── database/        # 데이터베이스 스크립트
└── docs/           # 문서
```

## API 엔드포인트
- POST /api/login - 로그인
- POST /api/register - 회원가입
- GET /api/user - 사용자 정보 조회
- GET /api/health - 서버 상태 확인

## 비용
- Railway 무료 플랜: 월 $5 크레딧
- PostgreSQL: 무료 포함
- 총 비용: 무료로 시작 가능

## 지원
- 개발팀: India Development Team
- 고객: 한국 기업
- 언어: 한국어 (UI), 영어 (개발)