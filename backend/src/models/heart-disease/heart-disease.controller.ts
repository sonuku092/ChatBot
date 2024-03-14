// heart-disease.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { HeartDiseaseService } from './heart-disease.service';

@Controller('heart-disease')
export class HeartDiseaseController {
    constructor(private readonly heartDiseaseService: HeartDiseaseService) {}

    @Post('predict')
    async predictHeartDisease(@Body() data: number[]): Promise<number[]> {
        return this.heartDiseaseService.predictHeartDisease(data);
    }
}
