import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../shared/services/openai.service';

@Injectable()
export class ChatsService {
  constructor(private readonly openAIService: OpenaiService) {}

  async handleUserMessage(userMessage: string): Promise<void | string> {
    // Here you can implement your logic to fetch responses for fixed questions

    const response = await this.openAIService.getResponse(userMessage);
    return response;
  }
}
