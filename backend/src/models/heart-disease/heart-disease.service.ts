// heart-disease.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class HeartDiseaseService {
    async predictHeartDisease(data: any): Promise<number> {
        // Implement your prediction logic here
        return Math.random(); // Dummy prediction for demonstration
    }
}
