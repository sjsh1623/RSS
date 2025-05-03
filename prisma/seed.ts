// prisma/seed.ts
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // source types
    await prisma.sourceType.createMany({
        data: [
            {id: 1, name: '연합뉴스', type: 'news'},
            {id: 2, name: 'SBS', type: 'news'},
            {id: 3, name: '매일경제', type: 'news'},
            {id: 4, name: 'JTBC', type: 'blog'},
            {id: 5, name: '동아일보', type: 'blog'},
            {id: 6, name: '블로그', type: 'blog'},
        ],
        skipDuplicates: true,
    });

    // categories
    await prisma.category.createMany({
        data: [
            {name: 'IT/기술', code: 'tech'},
            {name: '경제', code: 'economy'},
            {name: '정치', code: 'politics'},
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
                sourceTypeId: 1
            },
            {
                id: 2,
                url: "https://news.sbs.co.kr/news/newsflashRssFeed.do?plink=RSSREADER",
                language: "korean",
                is_active: true,
                created_at: new Date("2025-04-08T13:45:58.997Z"),
                sourceTypeId: 2
            },
            {
                id: 3,
                url: "https://www.mk.co.kr/rss/30000001/",
                language: "korean",
                is_active: true,
                created_at: new Date("2025-04-08T13:45:59.005Z"),
                sourceTypeId: 3
            },
            {
                id: 4,
                url: "https://www.mk.co.kr/rss/40300001/",
                language: "korean",
                is_active: true,
                created_at: new Date("2025-04-08T13:45:59.014Z"),
                sourceTypeId: 3
            },
            {
                id: 5,
                url: "https://fs.jtbc.co.kr/RSS/newsflash.xml",
                language: "korean",
                is_active: true,
                created_at: new Date("2025-04-08T13:45:59.022Z"),
                sourceTypeId: 4
            },
            {
                id: 6,
                url: "http://rss.donga.com/total.xml",
                language: "korean",
                is_active: true,
                created_at: new Date("2025-04-08T13:45:59.030Z"),
                sourceTypeId: 5
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