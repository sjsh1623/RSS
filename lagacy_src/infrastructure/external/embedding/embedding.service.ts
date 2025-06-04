// src/infrastructure/external/embedding/embedding.service.ts
import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';

@Injectable()
export class EmbeddingService {
    constructor(private readonly httpService: HttpService) {
    }

    /**
     * 로컬 LLM API에 POST 요청을 보내 임베딩 벡터를 반환받습니다.
     */
    async getEmbedding(text: string): Promise<number[]> {
        const apiUrl = process.env.EMBEDDING_API_URL;
        if (!apiUrl) {
            throw new Error('EMBEDDING_API_URL is not configured');
        }
        const res = await this.httpService.axiosRef.post<{ embedding: number[] }>(
            apiUrl,
            {text},
        );
        return res.data.embedding;
    }
}