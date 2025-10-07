# Railway 배포 가이드 - India Development Team

## 🚂 Railway로 가장 쉬운 배포 (인도 개발팀용)

### 인도 개발환경 고려사항
- **시간대**: Asia/Kolkata (IST)
- **배포 권장 시간**: IST 오전 10시-오후 6시
- **언어**: 개발(영어), UI(한국어)

### 1단계: GitHub 저장소 생성
```bash
# Git 초기화 (이미 완료됨)
git add .
git commit -m "Initial commit for India development team"

# GitHub 저장소 생성 후 연동
git remote add origin https://github.com/yourusername/login-system.git
git branch -M main
git push -u origin main
```

### 2단계: Railway 계정 생성
1. https://railway.app 접속
2. GitHub 계정으로 로그인
3. 인도 개발팀 계정 사용

### 3단계: Railway 배포
1. Railway 대시보드에서 "New Project" 클릭
2. "Deploy from GitHub repo" 선택
3. 저장소 선택
4. 자동으로 배포 시작 (약 3-5분 소요)

### 4단계: PostgreSQL 데이터베이스 추가
1. Railway 프로젝트에서 "New" 클릭
2. "Database" → "PostgreSQL" 선택
3. 자동으로 DATABASE_URL 환경변수 설정됨

### 5단계: 환경변수 설정 (인도 개발팀용)
Railway 대시보드에서 Variables 탭에서 설정:
```
JWT_SECRET=india_production_secret_key_2024
NODE_ENV=production
TZ=Asia/Kolkata
DEFAULT_LANGUAGE=ko
DEVELOPER_LANGUAGE=en
DEPLOYMENT_REGION=asia-south1
```

### 6단계: 확인 및 테스트
- Railway에서 제공하는 URL로 접속
- 로그인 테스트 (admin/password123)
- 한국 고객 시간대 확인

## 💰 비용 (인도 기준)
- **무료 플랜**: 월 $5 크레딧 제공
- **Hobby 플랜**: 월 $5 (약 ₹400)
- **총 비용**: 무료로 시작 가능

## ⚡ 배포 시간 (IST 기준)
- **첫 배포**: 3-5분
- **이후 업데이트**: 1-2분
- **권장 배포 시간**: IST 오전 10시-오후 6시

## 🔧 문제 해결
- 로그 확인: Railway 대시보드의 Deployments 탭
- 환경변수 확인: Variables 탭
- 재배포: Deployments 탭에서 "Redeploy" 클릭
- 시간대 문제: TZ=Asia/Kolkata 확인

## 📱 테스트 계정
- 사용자명: admin, 비밀번호: password123
- 사용자명: testuser, 비밀번호: password123

## 🌏 인도 개발팀 특별 고려사항

### 시간대 관리
- 서버 로그: UTC 기준
- 사용자 인터페이스: IST 기준
- 데이터베이스: UTC 저장, 표시 시 IST 변환

### 언어 설정
- 코드 주석: 영어
- 커밋 메시지: 영어
- UI 텍스트: 한국어 (고객 요구사항)
- 에러 메시지: 한국어

### 배포 전략
- 개발 환경: 로컬 (IST 시간대)
- 스테이징: Railway (UTC 시간대)
- 프로덕션: Railway (UTC 시간대, IST 표시)

## 🎯 Railway의 장점 (인도 개발팀 관점)
- ✅ GitHub 연동으로 자동 배포
- ✅ PostgreSQL 데이터베이스 자동 제공
- ✅ 환경변수 자동 관리
- ✅ HTTPS 자동 설정
- ✅ 무료 플랜 제공
- ✅ 아시아 서버로 빠른 접속
- ✅ 한국 고객 접속 속도 최적화