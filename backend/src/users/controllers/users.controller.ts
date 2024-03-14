import { Controller } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Controller('users')
@WebSocketGateway({ cors: true })
export class UsersController {
  @WebSocketServer() server: Server;

  @SubscribeMessage('userConnected')
  handleUserConnected(@MessageBody() userId: string): void {
    console.log(`User connected: ${userId}`);
  }

  @SubscribeMessage('userDisconnected')
  handleUserDisconnected(@MessageBody() userId: string): void {
    console.log(`User disconnected: ${userId}`);
  }
}
