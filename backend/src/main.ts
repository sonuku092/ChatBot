import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module'; // Replace './path/to/app.module' with the correct path to the AppModule file
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000'], // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  // Enable CORS with the defined options
  app.enableCors(corsOptions);

  await app.listen(5173);
}
bootstrap();
