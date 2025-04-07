import axios from 'axios';
import {ConfigService} from '@nestjs/config';

export class OllamaClient {
    private readonly model = 'mistral';

    constructor(private configService: ConfigService) {
    }

    async ask(prompt: string): Promise<string> {
        const baseUrl = process.env.OLLAMA_CLIENT_URL ?? '';

        const response = await axios.post(baseUrl, {
            model: this.model,
            stream: false,
            prompt,
        }, {
            timeout: 120000
        });

        return response.data.response?.trim();
    }
}