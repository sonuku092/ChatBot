// src/chats/chats.module.ts

import { Module } from '@nestjs/common';
import { WebSocketGateway } from './websocket.gateway'; // Import WebSocketGateway
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, WebSocketGateway], // Include WebSocketGateway in providers
})
export class ChatsModule {}
