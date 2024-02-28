// src/shared/services/redis.service.ts

import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class RedisService {
  private readonly redisClient: ClientProxy;

  constructor() {
    this.redisClient = ClientProxyFactory.create({
      options: {
        transport: Transport.REDIS,
        url: 'redis://localhost:6379', // Set your Redis connection URL here
      },
    });
  }

  async sendMessage(channel: string, message: any) {
    return this.redisClient.emit(channel, message).toPromise();
  }

  // Add more methods for interacting with Redis as needed
}
