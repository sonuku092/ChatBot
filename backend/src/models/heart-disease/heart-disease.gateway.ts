// heart-disease.gateway.ts

import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HeartDiseaseService } from './heart-disease.service';

@WebSocketGateway({ namespace: '/heart-disease' })
export class HeartDiseaseGateway {
    @WebSocketServer() server: Server;

    constructor(private readonly heartDiseaseService: HeartDiseaseService) {}

    @SubscribeMessage('heart')
    async handleHeartDiseasePrediction(@MessageBody() data: any): Promise<void> {
        const prediction = await this.heartDiseaseService.predictHeartDisease(data);
        this.server.emit('prediction', { prediction });
        console.log('Prediction:', prediction);
    }
}
