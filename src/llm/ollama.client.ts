import axios from 'axios';
import { ConfigService } from '@nestjs/config';

export class OllamaClient {
    private readonly model = 'mistral';

    constructor(private configService: ConfigService) {}

    async ask(prompt: string): Promise<string> {
        const baseUrl = this.configService.get<string>('OLLAMA_CLIENT_URL') ?? '';

        const response = await axios.post(baseUrl, {
            model: this.model,
            prompt,
        });

        return response.data.response?.trim();
    }
}