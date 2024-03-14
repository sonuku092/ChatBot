// heart-disease.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HeartDiseaseService } from './heart-disease.service';

@WebSocketGateway({ cors: true })
export class HeartDiseaseGateway {
    @WebSocketServer() server: Server;

    constructor(private readonly heartDiseaseService: HeartDiseaseService) {}

    @SubscribeMessage('heart-disease-prediction')
    async handleHeartDiseasePrediction(@MessageBody() data: number[]): Promise<number[]> {
        return this.heartDiseaseService.predictHeartDisease(data);
    }
}
