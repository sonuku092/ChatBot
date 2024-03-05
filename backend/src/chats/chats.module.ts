// src/chats/chats.module.ts

import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { OpenaiService } from '../shared/services/openai.service'; // Import OpenaiService
import { ChatGateway } from './chats.gateway';

@Module({
    imports: [],
    controllers: [ChatsController],
    providers: [ChatsService, OpenaiService, ChatGateway], // Add OpenaiService to providers
    exports: [ChatsService, OpenaiService], // Add OpenaiService to exports
})
export class ChatsModule {}
