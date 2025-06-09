#!/usr/bin/env bash

export DB_HOST=db

# 1. 도커 컴포즈로 모든 서비스 실행 (백그라운드)
docker-compose up --build -d

# 2. api-server가 뜰 때까지 대기 (8080 포트)
# 8080 포트 15초 대기, 실패 시 종료
# ./scripts/wait-for-it.sh localhost:8080 -t 15 -- echo "api-server is up!"

# 3. embedding 서비스가 뜰 때까지 대기 (8000 포트)
# 8000 포트 15초 대기, 실패 시 종료
# ./scripts/wait-for-it.sh localhost:8000 -t 15 -- echo "embedding is up!"

# 4. 전체 서비스 로그 보기
docker-compose logs -f 