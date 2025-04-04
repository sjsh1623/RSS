```aiignore
📁 src
│
├── 📁 domain                  # 🎯 핵심 비즈니스 도메인 계층 (OOP 중심)
│   ├── user/                 #    사용자 도메인
│   │   ├── User.ts
│   │   ├── UserRepository.ts
│   │   └── UserService.ts
│   ├── feed/                 #    콘텐츠 수집 도메인
│   │   ├── Feed.ts
│   │   ├── FeedRepository.ts
│   │   └── FeedService.ts
│   ├── category/             #    카테고리 도메인 (3뎁스)
│   ├── summary/              #    요약 처리 도메인
│   └── notification/         #    푸시 알림 도메인
│
├── 📁 infrastructure          # 🔌 외부 의존성 구현 (DB, API, Redis, 외부 API 등)
│   ├── db/                   #    Prisma, Sequelize 등 설정
│   │   └── index.ts
│   ├── firebase/             #    푸시 발송용 SDK 초기화
│   ├── openai/               #    LLM 연동 클래스
│   ├── rss/                  #    rss-parser 래핑
│   ├── crawler/              #    puppeteer 또는 cheerio 연동
│   └── scheduler/            #    cron 잡 등록 (node-cron)
│
├── 📁 app                    # 🧭 Next.js API Routes (핵심 entrypoint)
│   ├── api/
│   │   ├── feeds/
│   │   │   └── route.ts      #    /api/feeds (GET: 사용자 피드 반환)
│   │   ├── users/
│   │   │   └── route.ts      #    /api/users (POST: 회원가입 등)
│   │   ├── internal/         #    수집/요약/푸시 전용 API
│   │   │   ├── fetch-all/route.ts   # 서버 내부에서 수집 트리거
│   │   │   └── push-test/route.ts   # 푸시 발송 테스트용
│
├── 📁 shared                 # 🛠️ 공통 유틸, 타입, 상수, 미들웨어 등
│   ├── utils/
│   ├── types/
│   ├── constants/
│   └── middlewares/
│
├── 📁 locales                # 🌍 다국어 지원 i18next 용
│   ├── en.json
│   └── ko.json
│
├── 📁 scripts                # ⚙️ 초기 seed 스크립트, 마이그레이션 등
│   └── seedCategories.ts
│
├── middleware.ts            # 🔐 Next.js 미들웨어 (auth 등)
├── next.config.js
├── tsconfig.json
└── .env
```