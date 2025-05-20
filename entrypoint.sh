#!/bin/sh
set -e

# 1) DB가 올라올 때까지 대기
./scripts/wait-for-it.sh postgres:5432 -- echo "DB is up"
# 2) 최신 마이그레이션 배포
if [ "$NODE_ENV" = "development" ]; then
  echo "[entrypoint] Dev: prisma migrate dev"
  npx prisma migrate dev --name add-views-to-article
# npx prisma migrate dev --name init
  npx prisma db seed
else
  echo "[entrypoint] Prod: prisma migrate deploy"
  npx prisma migrate deploy
fi

# 3) 개발/프로덕션 모드에 따라 앱 실행
if [ "$NODE_ENV" = "development" ]; then
  echo "[entrypoint] Starting Nest (dev)"
  exec npm run start:dev
else
  echo "[entrypoint] Starting Nest (prod)"
  exec npm run start:prod
fi
