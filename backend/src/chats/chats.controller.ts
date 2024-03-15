// src/chats/chats.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
    constructor(
        private readonly chatsService: ChatsService,
    ) {}
}
