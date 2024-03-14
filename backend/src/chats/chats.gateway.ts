import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import OpenAI from 'openai';
import Redis from 'ioredis';

const OPENAI_API_KEY = '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'; // Use your API key here

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private redis: Redis = new Redis(); // Create a Redis client

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: string): Promise<void> {
    try {
      // Check if the response is cached in Redis
      const cachedResponse = await this.redis.get(`cache_${data}`);

      if (cachedResponse) {
        this.server.emit('message', cachedResponse);
      } else {
        const messages = [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: data },
        ];

        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: messages as OpenAI.ChatCompletionMessageParam[], // Convert to the expected type
          max_tokens: 1024,
        });

        if (response && response.choices && response.choices.length > 0) {
          const botResponse = response.choices[0].message.content;

          // Cache the response in Redis
          await this.redis.set(`cache_${data}`, botResponse);

          this.server.emit('message', botResponse);

        } else {
          console.error('GPT-3 response was empty:', response);
        }
      }
    } catch (error) {
      console.error('Error generating response from GPT-3:', error);
    }
  }
}
