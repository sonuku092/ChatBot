import { Injectable } from '@nestjs/common';
import { OpenAIConstants } from '../constants/openai.constants';
import axios from 'axios';

@Injectable()
export class OpenAIService {
  async fetchResponseForFixedQuestion(question: string): Promise<string> {
    // Implement logic to fetch response for fixed questions using OpenAI API or any other method
    // Example using OpenAI API:
    try {
      const response = await axios.post(OpenAIConstants.apiUrl, {
        prompt: question,
        max_tokens: 50, // Adjust this based on your requirement
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OpenAIConstants.apiKey}`,
        },
      });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);
      return 'Sorry, I encountered an error.';
    }
  }
}

export default OpenAIService;