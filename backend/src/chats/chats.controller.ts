// src/chats/chats.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@Controller()
@WebSocketGateway({ cors: true })
export class ChatsController {
    constructor( private readonly chatsService: ChatsService,) {}

    @WebSocketServer()
    server: any;

    @SubscribeMessage('message')
    async handleTyping(@Body() data: string): Promise<void> {
        this.server.emit('message', data);
    }
}
