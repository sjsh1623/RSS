// src/infrastructure/persistence/persistence.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

import { RssSourceRepositoryImpl }  from './prisma/rss-source.repository.impl';
import { ArticleRepositoryImpl }    from './prisma/article.repository.impl';
import { CategoryRepositoryImpl }   from './prisma/category.repository.impl';
import { UserRepositoryImpl }       from './prisma/user.repository.impl';
import { AuthCodeRepositoryImpl }   from './prisma/auth-code.repository.impl';
import { TokenRepositoryImpl }      from './prisma/token.repository.impl';

// 👇 토큰을 이 파일 최상단에서 한 번만 선언합니다
export const RSS_SOURCE_REPOSITORY   = 'IReadRssSourceRepository';
export const ARTICLE_REPOSITORY      = 'IArticleRepository';
export const CATEGORY_REPOSITORY     = 'ICategoryRepository';
export const USER_REPOSITORY         = 'IUserRepository';
export const AUTH_CODE_REPOSITORY    = 'IAuthCodeRepository';
export const TOKEN_REPOSITORY        = 'ITokenRepository';

@Module({
    imports: [PrismaModule],
    providers: [
        { provide: RSS_SOURCE_REPOSITORY, useClass: RssSourceRepositoryImpl },
        { provide: ARTICLE_REPOSITORY,    useClass: ArticleRepositoryImpl },
        { provide: CATEGORY_REPOSITORY,   useClass: CategoryRepositoryImpl },
        { provide: USER_REPOSITORY,       useClass: UserRepositoryImpl },
        { provide: AUTH_CODE_REPOSITORY,  useClass: AuthCodeRepositoryImpl },
        { provide: TOKEN_REPOSITORY,      useClass: TokenRepositoryImpl },
    ],
    exports: [
        RSS_SOURCE_REPOSITORY,
        ARTICLE_REPOSITORY,
        CATEGORY_REPOSITORY,
        USER_REPOSITORY,
        AUTH_CODE_REPOSITORY,
        TOKEN_REPOSITORY,
    ],
})
export class PersistenceModule {}