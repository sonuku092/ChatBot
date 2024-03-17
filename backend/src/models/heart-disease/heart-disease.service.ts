// heart-disease.service.ts
import { Injectable } from '@nestjs/common';
import { HeartDiseaseModel } from './heart-disease-model';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
export class HeartDiseaseService {
    private model: HeartDiseaseModel;

    constructor() {
        this.model = new HeartDiseaseModel();
    }

    getHello(): string {
        return 'Hello from the heart disease service!';
    }

    async predictHeartDisease(data: number[]): Promise<number[]> {
        return this.model.predict([data]); // Wrap the data array in another array
    }
}