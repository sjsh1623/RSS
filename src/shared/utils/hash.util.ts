// src/shared/utils/hash.util.ts
import { createHash } from 'crypto';

/**
 * 주어진 URL 문자열을 SHA-256 해시로 변환합니다.
 * @param url 원본 URL
 * @returns 16진수 SHA-256 해시
 */
export function hashUrl(url: string): string {
    return createHash('sha256')
        .update(url)
        .digest('hex');
}