// src/shared/services/openai.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenaiService {
    fetchResponseForFixedQuestion(data: string) {
      throw new Error('Method not implemented.');
    }
    private readonly apiKey: string;

    constructor() {
        this.apiKey = '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';
    }

    async getResponse(data: string): Promise<string> {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-002/completions',
                {
                    prompt: data,
                    max_tokens: 150,
                    temperature: 0.7,
                    stop: '\n'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error fetching response from ChatGPT:', error);
            return 'Sorry, I am unable to respond at the moment.';
        }
    }
}
