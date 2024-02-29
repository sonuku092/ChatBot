// src/chats/chats.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { UserMessageDto } from '../shared/dto/user-message.dto';
import { OpenaiService } from '../shared/services/openai.service';

@Controller('chats')
export class ChatsController {
    constructor(
        private readonly chatsService: ChatsService,
        private readonly openaiService: OpenaiService,
    ) {}

    @Post()
    async handleUserMessage(@Body() userMessageDto: UserMessageDto): Promise<string> {
        const response = await this.openaiService.getResponse(userMessageDto.message);
        return response;
    }
}
