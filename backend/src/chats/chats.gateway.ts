import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OpenaiService } from 'src/shared/services/openai.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway {

  @WebSocketServer() server: Server;
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: string): Promise<void> {
    const openaiService = new OpenaiService(); // Create an instance of the OpenaiService class
    const response = await openaiService.getResponse(data); // Call the getResponse method on the instance
    this.server.emit('message', response);
  }
}
