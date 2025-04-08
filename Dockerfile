# 1. Node 이미지 사용
FROM node:20

# 2. 작업 디렉토리 설정
WORKDIR /usr/src/app

# 3. package.json 복사 후 의존성 설치
COPY package*.json ./
RUN npm install

# 4. 소스 복사
COPY . .

# 5. NestJS build
RUN npm run build

# 6. 개발 모드 실행
CMD ["npm", "run", "start:dev"]