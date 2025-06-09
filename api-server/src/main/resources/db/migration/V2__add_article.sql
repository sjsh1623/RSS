CREATE TABLE IF NOT EXISTS article (
    id BIGSERIAL PRIMARY KEY,
    url VARCHAR(1024) NOT NULL UNIQUE,
    url_hash VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(1024) NOT NULL,
    pub_date TIMESTAMP NOT NULL,
    provider_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    language VARCHAR(32) NOT NULL,
    short_summary TEXT NOT NULL,
    long_summary TEXT NOT NULL,
    image_url VARCHAR(1024),
    context TEXT,
    created_at TIMESTAMP NOT NULL,
    embedding FLOAT8[],
    views BIGINT NOT NULL DEFAULT 0
);
CREATE INDEX idx_article_embedding ON article USING gin (embedding);
CREATE INDEX idx_article_views ON article (views DESC);
