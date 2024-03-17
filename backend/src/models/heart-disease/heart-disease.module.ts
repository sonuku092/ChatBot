import { Module } from '@nestjs/common';
import { HeartDiseaseController, heart } from './heart-disease.controller';
import { HeartDiseaseService } from './heart-disease.service';

@Module({
  controllers: [HeartDiseaseController, heart],
  providers: [HeartDiseaseService],
})
export class HeartDiseaseModule {}


