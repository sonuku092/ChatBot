import { Module } from '@nestjs/common';
import { HeartDiseaseController } from './heart-disease.controller';
import { HeartDiseaseService } from './heart-disease.service';

@Module({
  controllers: [HeartDiseaseController],
  providers: [HeartDiseaseService],
})
export class HeartDiseaseModule {}
