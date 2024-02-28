import { Controller, Post, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('api')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('user-message')
  async handleUserMessage(@Body() userMessageDto: { message: string }) {
    const response = await this.chatsService.handleUserMessage(userMessageDto.message);
    return { message: response };
  }
}
