// src/chats/chats.module.ts

import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { OpenaiService } from '../shared/services/openai.service'; // Import OpenaiService

@Module({
    controllers: [ChatsController],
    providers: [ChatsService, OpenaiService], // Add OpenaiService to providers
})
export class ChatsModule {}
