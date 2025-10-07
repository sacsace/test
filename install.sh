#!/bin/bash

echo "로그인 시스템 설치를 시작합니다..."

echo ""
echo "1. 루트 의존성 설치 중..."
npm install

echo ""
echo "2. 서버 의존성 설치 중..."
cd server
npm install
cd ..

echo ""
echo "3. 클라이언트 의존성 설치 중..."
cd client
npm install
cd ..

echo ""
echo "설치가 완료되었습니다!"
echo ""
echo "다음 단계:"
echo "1. PostgreSQL 데이터베이스를 설치하고 test_db 데이터베이스를 생성하세요"
echo "2. server/env.example 파일을 복사하여 .env 파일을 생성하고 데이터베이스 정보를 입력하세요"
echo "3. database/init.sql 파일을 실행하여 테이블을 생성하세요"
echo "4. npm run dev 명령으로 개발 서버를 시작하세요"
echo ""
