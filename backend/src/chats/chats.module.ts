import { Module } from '@nestjs/common';
import { MyWebSocketGateway } from './websocket.gateway'; // Import MyWebSocketGateway

@Module({
  providers: [MyWebSocketGateway],
})
export class ChatsModule {}
