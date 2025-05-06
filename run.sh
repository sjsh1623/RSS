#!/bin/bash

set -e

echo "🔄 병합 중..."
npx tsx prisma/merge-schema.ts
npx prisma generate


if [ ! -f prisma/schema.prisma ]; then
  echo "❌ schema.prisma 생성 실패"
  exit 1
fi

echo "✅ 병합 완료, Docker Compose 시작"
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d