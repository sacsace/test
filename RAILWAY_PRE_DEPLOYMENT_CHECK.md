# 🔍 Railway 배포 전 오류 확인 가이드

## ✅ 로컬 테스트 완료

### 서버 테스트 결과:
- ✅ **의존성 설치**: 성공 (0 vulnerabilities)
- ✅ **서버 시작**: 정상 작동 (포트 5000)
- ✅ **API 엔드포인트**: 정상 응답
- ✅ **헬스 체크**: 통과

## 🚨 Railway 배포 전 확인사항

### 1. 파일 구조 확인
```
server/
├── index.js          ✅ 메인 서버 파일
├── package.json       ✅ 의존성 정의
└── node_modules/     ✅ 의존성 설치됨
```

### 2. package.json 확인
```json
{
  "name": "login-system-server",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"  ✅ 시작 스크립트 존재
  },
  "engines": {
    "node": "18.x",           ✅ Node.js 버전 지정
    "npm": "9.x"              ✅ npm 버전 지정
  }
}
```

### 3. 환경변수 확인
Railway에서 설정해야 할 환경변수:
```
JWT_SECRET=india_production_secret_2024
NODE_ENV=production
TZ=Asia/Kolkata
```

### 4. 데이터베이스 연결 확인
- PostgreSQL 데이터베이스가 Railway에서 생성되었는지 확인
- DATABASE_URL 환경변수가 자동으로 설정되었는지 확인

## 🔧 Railway 배포 전 로컬 테스트 명령어

### 서버 테스트:
```bash
cd server
npm install
npm start
```

### API 테스트:
```bash
# 헬스 체크
curl http://localhost:5000/api/health

# 로그인 테스트
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

### 빌드 테스트:
```bash
# 프로덕션 모드로 테스트
NODE_ENV=production npm start
```

## 🚨 일반적인 Railway 오류와 해결방법

### 1. "No start command was found"
**원인**: package.json에 start 스크립트가 없음
**해결**: `"start": "node index.js"` 추가

### 2. "Module not found"
**원인**: 의존성이 설치되지 않음
**해결**: `npm install` 실행

### 3. "Port already in use"
**원인**: 포트 충돌
**해결**: Railway는 자동으로 포트 할당

### 4. "Database connection failed"
**원인**: PostgreSQL 연결 실패
**해결**: Railway에서 PostgreSQL 서비스 추가

### 5. "CORS error"
**원인**: 프론트엔드 도메인이 CORS에 허용되지 않음
**해결**: CORS_ORIGIN 환경변수 설정

## 📋 Railway 배포 체크리스트

- [ ] 서버 디렉토리 구조 확인
- [ ] package.json start 스크립트 확인
- [ ] 로컬에서 서버 실행 테스트
- [ ] API 엔드포인트 테스트
- [ ] 환경변수 설정 확인
- [ ] PostgreSQL 데이터베이스 추가
- [ ] CORS 설정 확인
- [ ] 헬스 체크 엔드포인트 테스트

## 🎯 현재 상태

### ✅ 완료된 항목:
- 서버 파일 구조 확인
- package.json 설정 확인
- 로컬 서버 테스트 완료
- API 엔드포인트 테스트 완료
- Railway 설정 파일 생성

### 🚀 다음 단계:
1. Railway에서 재배포 실행
2. 배포 로그 확인
3. 환경변수 설정 확인
4. PostgreSQL 데이터베이스 연결 확인
5. Vercel 프론트엔드 배포

## 💡 팁
- Railway 배포 로그를 실시간으로 확인하세요
- 오류 발생 시 로그의 마지막 부분을 확인하세요
- 환경변수는 대소문자를 구분합니다
- 데이터베이스 연결은 배포 후 몇 분 소요될 수 있습니다
