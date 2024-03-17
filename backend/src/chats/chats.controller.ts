// src/chats/chats.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@Controller('chats')
@WebSocketGateway({ cors: true })
export class ChatsController {
    constructor( private readonly chatsService: ChatsService,) {}

    @WebSocketServer()
    server: any;
    getAllChats() {
        return this.chatsService.getAllChats();
    }
}
