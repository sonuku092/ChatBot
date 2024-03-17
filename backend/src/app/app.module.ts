import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService} from './app.service';
import { ChatsModule } from '../chats/chats.module';
import { ChatsController } from 'src/chats/chats.controller';
import { UsersModule } from 'src/users/users.module';
import { HeartDiseaseModule } from 'src/models/heart-disease/heart-disease.module';
import { HeartDiseaseController } from 'src/models/heart-disease/heart-disease.controller';

@Module({
  imports: [ChatsModule, UsersModule, HeartDiseaseModule],
  controllers: [AppController, ChatsController, HeartDiseaseController],
  providers: [AppService],
})
export class AppModule {}

