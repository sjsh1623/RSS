# RSS 프로젝트

RSS 피드를 수집하고 분석하여 사용자에게 맞춤형 뉴스 콘텐츠를 제공하는 서비스입니다.

## 기술 스택

### Backend
- Java 17
- Spring Boot
- PostgreSQL
- Flyway (데이터베이스 마이그레이션)
- JPA/Hibernate

### Frontend
- React
- TypeScript
- Tailwind CSS

## 프로젝트 구조

```
RSS/
├── api-server/          # Spring Boot 백엔드 서버
├── web-client/         # React 프론트엔드
└── lagacy_src/         # 레거시 코드
```

## 데이터베이스 스키마

### User
| 컬럼명        | 타입           | 제약조건                | 설명         |
|--------------|---------------|------------------------|------------|
| id           | BIGSERIAL     | PK, auto increment     | 유저 ID     |
| email        | VARCHAR       | NOT NULL, UNIQUE       | 이메일      |
| passwordHash | VARCHAR       | NOT NULL               | 비밀번호 해시 |
| name         | VARCHAR       |                        | 이름        |
| createdAt    | TIMESTAMP     |                        | 생성일      |

### Category
| 컬럼명        | 타입           | 제약조건                | 설명         |
|--------------|---------------|------------------------|------------|
| id           | BIGSERIAL     | PK, auto increment     | 카테고리 ID |
| name         | VARCHAR       | NOT NULL               | 이름        |
| code         | VARCHAR       | NOT NULL, UNIQUE       | 코드        |
| createdAt    | TIMESTAMP     |                        | 생성일      |
| updatedAt    | TIMESTAMP     |                        | 수정일      |

### Subcategory
| 컬럼명        | 타입           | 제약조건                | 설명         |
|--------------|---------------|------------------------|------------|
| id           | BIGSERIAL     | PK, auto increment     | 소분류 ID   |
| name         | VARCHAR       | NOT NULL               | 이름        |
| code         | VARCHAR       | NOT NULL, UNIQUE       | 코드        |
| createdAt    | TIMESTAMP     |                        | 생성일      |
| updatedAt    | TIMESTAMP     |                        | 수정일      |
| category_id  | BIGINT        | FK(Category.id)        | 상위 카테고리|

### Article
| 컬럼명        | 타입           | 제약조건                | 설명         |
|--------------|---------------|------------------------|------------|
| id           | BIGSERIAL     | PK, auto increment     | 기사 ID     |
| url          | VARCHAR(1024) | NOT NULL, UNIQUE       | 기사 URL    |
| url_hash     | VARCHAR(255)  | NOT NULL, UNIQUE       | URL 해시    |
| title        | VARCHAR(1024) | NOT NULL               | 제목        |
| pub_date     | TIMESTAMP     | NOT NULL               | 발행일      |
| provider_id  | BIGINT        | NOT NULL               | 제공자 ID   |
| category_id  | BIGINT        | NOT NULL               | 카테고리 ID |
| language     | VARCHAR(32)   | NOT NULL               | 언어        |
| short_summary| TEXT          | NOT NULL               | 요약        |
| long_summary | TEXT          | NOT NULL               | 상세 요약   |
| image_url    | VARCHAR(1024) |                        | 이미지 URL  |
| context      | TEXT          |                        | 원문        |
| created_at   | TIMESTAMP     | NOT NULL               | 생성일      |
| embedding    | FLOAT8[]      |                        | 임베딩 벡터 |
| views        | BIGINT        | NOT NULL, DEFAULT 0    | 조회수      |

## 개발 환경 설정

### Docker로 시작하기

1. **DB, API 서버 환경변수는 docker-compose.yml에서 관리**
2. **JPA 설정**: `spring.jpa.hibernate.ddl-auto=validate`로 두고, Flyway가 마이그레이션을 담당합니다.
3. **마이그레이션 파일**: `src/main/resources/db/migration/V1__init.sql`, `V2__add_article.sql`에서 테이블 구조를 관리합니다.
4. **완전 초기화**: 기존 데이터베이스를 완전히 새로 시작하려면 아래 명령어를 사용하세요.

```sh
docker-compose down -v   # 모든 컨테이너와 볼륨 삭제(데이터 완전 초기화)
docker-compose build --no-cache
./start.sh
```

5. **DB 계정/비밀번호**는 docker-compose.yml과 application.properties에 맞춰주세요.
   - 기본값: user=myuser, password=mypassword, db=katchup

## API 문서

API 문서는 Swagger UI를 통해 제공됩니다. 서버 실행 후 다음 URL에서 확인할 수 있습니다:
```
http://localhost:8080/swagger-ui.html
```

## 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

---

> 추가 엔티티가 있다면 위 표에 맞춰 README에 계속 추가해 주세요.
> Flyway 마이그레이션 파일도 버전별로 추가해 주세요.