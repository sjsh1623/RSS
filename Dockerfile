FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .
COPY prisma/schema.prisma prisma/schema.prisma

RUN npx prisma generate
RUN npm run build

# ✅ CMD 수정 (불필요한 중복 제거)
CMD sh -c "npx prisma migrate deploy && npx prisma db seed && npm run start:dev"