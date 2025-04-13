// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // source types
    await prisma.sourceType.createMany({
        data: [
            { name: '뉴스', code: 'news' },
            { name: '블로그', code: 'blog' },
        ],
        skipDuplicates: true,
    });

    // categories
    await prisma.category.createMany({
        data: [
            { name: 'IT/기술', code: 'tech' },
            { name: '경제', code: 'economy' },
            { name: '정치', code: 'politics' },
        ],
        skipDuplicates: true,
    });

    // rss
    await prisma.rss.createMany({
        data: [
            {
                id: 1,
                url: "https://www.yna.co.kr/rss/news.xml",
                language: "korean",
                is_active: true,
                created_at: new Date("2025-04-08T13:45:58.984Z"),
                source: "연합뉴스"
            },
            {
                id: 2,
                url: "https://news.sbs.co.kr/news/newsflashRssFeed.do?plink=RSSREADER",
                language: "korean",
                is_active: true,
                created_at: new Date("2025-04-08T13:45:58.997Z"),
                source: "SBS"
            },
            {
                id: 3,
                url: "https://www.mk.co.kr/rss/30000001/",
                language: "korean",
                is_active: true,
                created_at: new Date("2025-04-08T13:45:59.005Z"),
                source: "매일경제"
            },
            {
                id: 4,
                url: "https://www.mk.co.kr/rss/40300001/",
                language: "korean",
                is_active: true,
                created_at: new Date("2025-04-08T13:45:59.014Z"),
                source: "매일경제"
            },
            {
                id: 5,
                url: "https://fs.jtbc.co.kr/RSS/newsflash.xml",
                language: "korean",
                is_active: true,
                created_at: new Date("2025-04-08T13:45:59.022Z"),
                source: "JTBC"
            },
            {
                id: 6,
                url: "http://rss.donga.com/total.xml",
                language: "korean",
                is_active: true,
                created_at: new Date("2025-04-08T13:45:59.030Z"),
                source: "동아일보"
            }
        ],
        skipDuplicates: true,
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });