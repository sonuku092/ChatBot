// heart-disease.service.ts
import { Injectable } from '@nestjs/common';
import { HeartDiseaseModel } from './heart-disease-model';

@Injectable()
export class HeartDiseaseService {
    private model: HeartDiseaseModel;

    constructor() {
        this.model = new HeartDiseaseModel();
    }

    async predictHeartDisease(data: number[]): Promise<number[]> {
        return this.model.predict([data]); // Wrap the data array in another array
    }
}
