```aiignore
📁 src
│
├── 📁 modules/                   # 도메인 계층 (기능별 모듈: 가장 중요)
│   ├── user/                    # 사용자 관리
│   │   ├── user.module.ts
│   │   ├── user.service.ts
│   │   ├── user.controller.ts
│   │   ├── user.entity.ts
│   │   └── user.repository.ts
│   │
│   ├── feed/                    # 수집된 피드 (기사/뉴스) 관리
│   │   ├── feed.module.ts
│   │   ├── feed.service.ts
│   │   ├── feed.controller.ts   # 사용자용 API
│   │   ├── feed.entity.ts
│   │   └── feed.repository.ts
│   │
│   ├── category/                # 3뎁스 카테고리
│   │   ├── category.module.ts
│   │   ├── category.service.ts
│   │   ├── category.entity.ts
│   │   └── category.repository.ts
│   │
│   ├── summary/                 # 요약 처리 (LLM)
│   │   ├── summary.module.ts
│   │   ├── summary.service.ts
│   │   └── summary.strategy.ts  # OpenAI, Claude 등 요약 전략 클래스
│   │
│   ├── notification/            # 푸시 알림
│   │   ├── notification.module.ts
│   │   ├── notification.service.ts
│   │   └── fcm.sender.ts        # Firebase 연동
│
├── 📁 collector/                # 외부 데이터 수집기 (RSS, API, Crawler 등)
│   ├── rss/
│   │   ├── rss.module.ts
│   │   ├── rss.service.ts       # RSSFetcher
│   │   └── rss.config.ts
│   │
│   ├── api/
│   │   ├── api.module.ts
│   │   └── api.service.ts
│   │
│   ├── crawler/
│   │   ├── crawler.module.ts
│   │   └── crawler.service.ts
│   │
│   └── collector.module.ts      # 모든 수집기 종합
│
├── 📁 scheduler/                # 수집 주기 로직 (node-cron 기반)
│   ├── scheduler.module.ts
│   ├── rss-job.service.ts       # 30초마다 feed 순환 수집
│   └── daily-job.service.ts     # 예: 하루 1회 푸시 요약 발송
│
├── 📁 shared/                   # 공통 유틸, 인터페이스, 상수, 미들웨어
│   ├── interfaces/
│   │   ├── parsed-article.interface.ts
│   │   └── summary.interface.ts
│   ├── constants/
│   │   └── rss-feeds.constant.ts
│   ├── utils/
│   │   ├── time.util.ts
│   │   └── text.util.ts
│   ├── filters/                 # ExceptionFilter
│   └── guards/                  # AuthGuard 등
│
├── 📁 config/                   # 환경변수 설정 및 외부 SDK 설정
│   ├── openai.config.ts
│   ├── firebase.config.ts
│   └── database.config.ts
│
├── 📁 database/                 # DB 연결/모델 등록 (Prisma or TypeORM 등)
│   └── prisma.service.ts
│
├── 📁 scripts/                  # seed 작업 등 CLI 전용
│   └── seed-categories.ts
│
├── main.ts                     # Nest 앱 실행
├── ecosystem.config.js         # PM2 실행 파일
└── .env
```

```aiignore
nest generate module scheduler
nest generate service scheduler/rss-job
```

docker-compose exec backend npx prisma generate
docker-compose up --build