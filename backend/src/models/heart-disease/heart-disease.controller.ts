// heart-disease.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { HeartDiseaseService } from './heart-disease.service';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Controller()
export class heart {
    constructor(private readonly heartDiseaseService: HeartDiseaseService) {}

    @Get()
    getHello(): string {
        return this.heartDiseaseService.getHello();
    }
}

@Controller()
@WebSocketGateway({ cors: true })
export class HeartDiseaseController {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('websocket')
    handleWebSocket(): string {
        console.log('websocket');
        return 'WebSocket message received';
    }
}