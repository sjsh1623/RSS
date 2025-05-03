import axios from 'axios';

export class CohereClient {
    private readonly model = 'command-a-03-2025'; // 또는 최신 모델명으로 교체

    async ask(prompt: string): Promise<string> {
        try {
            const response = await axios.post(
                'https://api.cohere.ai/v1/chat',
                {
                    model: this.model,
                    message: prompt,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data.text?.trim() || '';
        } catch (error) {
            console.error('Cohere API Error:', error?.response?.data || error);
            return '';
        }
    }
}