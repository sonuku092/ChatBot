// src/chats/chats.module.ts

import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatGateway } from './chats.gateway';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [ChatsController],
    providers: [ChatsService, ChatGateway], // Add OpenaiService to providers
    exports: [ChatsService], // Add OpenaiService to exports
})
export class ChatsModule {}
