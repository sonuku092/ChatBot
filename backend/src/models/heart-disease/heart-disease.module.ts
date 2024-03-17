import { Module } from '@nestjs/common';
import { HeartDiseaseController } from './heart-disease.controller';
import { HeartDiseaseService } from './heart-disease.service';
import { HeartDiseaseGateway } from './heart-disease.gateway';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [HeartDiseaseController],
  providers: [HeartDiseaseGateway, HeartDiseaseService],
  exports: [HeartDiseaseService, HeartDiseaseGateway],
})
export class HeartDiseaseModule {}


