import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class EmbeddingService {
    constructor(private httpService: HttpService) {}

    async getEmbedding(text: string): Promise<number[]> {
        const res = await this.httpService.axiosRef.post<{ embedding: number[] }>(
            process.env.EMBEDDING_API_URL || '',
            { text }
        );

        return res.data.embedding;
    }
}