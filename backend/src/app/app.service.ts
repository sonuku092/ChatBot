import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Hello World!</h1> <p>This is a NestJS app.</p> <p>Check out the <a href="http://localhost:3000" target="_blank">API</a></p>';
  }

  getAbout(): string {
    return '<h1>About</h1> <p>This is a NestJS app.</p> <p>Check out the <a href="http://localhost:3000" target="_blank">API</a></p>';
  }

  getContact(): string {
    return '<h1>Contact</h1>';
  }
}



