// heart-disease.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { HeartDiseaseService } from './heart-disease.service';
import {
    MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@Controller()
export class heart {
  constructor(private readonly heartDiseaseService: HeartDiseaseService) {}
}

@Controller()
@WebSocketGateway({ cors: true })
export class HeartDiseaseController {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('hello')
  async handleTyping(@MessageBody() data: string): Promise<void> {
    this.server.emit('message', data);
  }
}
