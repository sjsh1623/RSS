#!/usr/bin/env bash

# 1. 도커 컴포즈로 모든 서비스 실행 (백그라운드)
docker-compose up -d

# 2. api-server가 뜰 때까지 대기 (8080 포트)
./scripts/wait-for-it.sh localhost:8080 -- echo "api-server is up!"

# 3. embedding 서비스가 뜰 때까지 대기 (8000 포트)
./scripts/wait-for-it.sh localhost:8000 -- echo "embedding is up!"

# 4. 전체 서비스 로그 보기
docker-compose logs -f 