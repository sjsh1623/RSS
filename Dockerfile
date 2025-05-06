# 베이스 이미지를 Debian 계열로 바꿔야 apt-get 사용 가능
FROM node:20

WORKDIR /usr/src/app

# 1) PostgreSQL 클라이언트(psql) 및 wait-for-it용 netcat 설치
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      postgresql-client \
      netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# 2) 의존성 설치
COPY package.json package-lock.json ./
RUN npm ci

# 3) Prisma 스키마 포함 및 Client 생성
COPY prisma ./prisma
RUN npx prisma generate

# 4) 애플리케이션 소스 복사 및 빌드
COPY . .
RUN npm run build

# 5) 엔트리포인트 스크립트 실행
ENTRYPOINT ["sh", "/usr/src/app/entrypoint.sh"]