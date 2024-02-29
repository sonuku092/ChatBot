import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../shared/services/openai.service';

@Injectable()
export class ChatsService {
  constructor(private readonly openAIService: OpenaiService) {}

  async handleUserMessage(userMessage: string): Promise<void | string> {
    // Here you can implement your logic to fetch responses for fixed questions
    // For example, using a service like OpenAI or any other method you prefer
    const response = await this.openAIService.fetchResponseForFixedQuestion(userMessage);
    return response;
  }
}
