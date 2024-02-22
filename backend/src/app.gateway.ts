// ... (existing imports)
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import OpenAI from 'openai';
import Redis from 'ioredis'; // Import ioredis
import firebaseAdmin from 'firebase-admin'; // Import Firebase Admin
import * as admin from 'firebase-admin';

const OPENAI_API_KEY = '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'; // Use your API key here
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Your Firebase Admin config
const firebaseConfig = {
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: 'talkbot-997f5',
    private_key_id: 'd21f325d717e0936c35320dbbfa4d7f38bc88939',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCXRthdzazgyFI\nkSFimFzZHkuVxIotJRcRsIKEONg9GQFBDMyxcQKwy35EWHvIXMVXzLl8q7zZTLD7\nlpHF+qpil3sBM43nEXT3SuB9sjOmSbEhMiwQaVdVrp/mr3CQ8DhjcvUfx55EWn40\nzsGAQMx27Iswp7YLeVjDOYTxXoLnU8nh25/6wuO50j12HCutzH3kevjpqIsCBk72\nw2sYVxt+cQEusD53AzP/c9cNzguKzXUTTGkzGHrOB7attbVA731+MPGdgRqxL2lb\ndXgAIhYVIJhRTrrZTCMc73OZNgPunZLMlW2fE3y2jkLQfl/aaOaAu248p1gYFalq\nz/1pHudFAgMBAAECggEACsEwzlV/XwgmzlIhgR13KG28YZ7MxS9j4GReRHIKHQ9b\nehL65z1JQykaD9lpjVj8yR1DN4/Kf6ehChAhzsz49+2eg8mA1O6qrzL4dbFnmZBC\n+dhB3JfyRNkdxfD35JKLkY0p3Rv5jkSyQ7pxCzy1U5tGdGcYnqKUnnDPV1+9vzj9\n96BhX4HNs+hQDO/HVIm57m4QPU8htp1IVgxDRvmV8Qvhb0XRH8kfm4VJT5SF1y5b\nGLCINsRTr0YnW/7RhvTSLGJ2Ja5XYpNp86RbS05RRiHs3Eg4GdqSfsq6HlHRzliw\nQPv+viWYhyKyWwsSER3WDNIzjvfRAA9M3paEoKXH3QKBgQDoVtLOv3J3mqlHWj9B\n4ttGeAxisScjjzo8VtPNqEXcOSjVWM0uqeC8XFOgIQSgnMjHJMMg+Q1YDaGp8/y3\n4EB2+ACVBo/6KXQbfbChvbeiUH8+GE0ZjkkkzGjmvgX3ZGjTb9nlmnlf8AXOAsWx\nDBhTWpbDfm46gqhCrsHakw9jswKBgQDWKD91KRydUrdysOB+p5gFsLiR412WY2hl\ngM76LrTSLkHOqcViSLR5/fERtRlrO6iatAoZzSX0Ec5F/aVN0xHTThF/bgh3OfNR\nsq8xQZ6guotx7Yj05UK9RWcqWYh4xf0HiHvTu4k9XLgevlNBBJXdD/Vvkp29IvLU\nkHiN3p7tJwKBgQC0qGZMqqKIC7OarrrHMW2NMuV2jAdB6CnBJ0aUAEcqASwWEHGi\n2ibMcAH6XhIqDR81cglkByPwFtFgxD36gB3AJADX3/1t6HPGuInyigFS7cKy9tRk\njbWkLmlXGeSrw+Can7tPhDjid1EcKh2sGBqGHcdjBVkSl+vbxeUoXvc1bwKBgAXa\nPbm28Og/vXGt8cSkUdw98x1RiFo2x0CW35Eou5pO10+Nhi5kbEI1NWRVfadXjwkD\nSI9h8tqTrf5tqxnQXdlXddT0rdiMReECsBT5hRtBXdQ0OJzwsv03K1WV8svSJVMS\nYMfthRefNAzrCJ1rQakz6XIuII9tqBM1C4ZdAhzbAoGBAL8+GHnL3qZDBCcZLIsp\nWMzYwI17gBso971Ba/BYLq3Wsk+7Fjoqm50PfAelBxWy3ku9VojP3Q0OBIOTZMaA\n31MMRCDO2w3/J8KwRoblp0UK8XpJ4qd5WYf1IYtR/0tvxDPpgOK/1cl+/cFodtUc\nh/mInTee8kWXyQFXeFj+KQN0\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-78rnf@talkbot-997f5.iam.gserviceaccount.com',
    client_id: '115690868805996961450',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-78rnf%40talkbot-997f5.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
  } as admin.ServiceAccount),
  databaseURL: 'https://console.firebase.google.com/project/talkbot-997f5/firestore/data/~2FChats~2F1CxeW4Q08vtYX8adT1K2',
};

// Initialize Firebase Admin
firebaseAdmin.initializeApp(firebaseConfig);

@WebSocketGateway(8001, { cors: true })
export class AppGateway {
  @WebSocketServer()
  server: Server;

  private redis: Redis = new Redis(); // Create a Redis client

  @SubscribeMessage('user-message')
  async handleMessage(@MessageBody() message: string) {
    try {
      // Check if the response is cached in Redis
      const cachedResponse = await this.redis.get(`cache_${message}`);

      if (cachedResponse) {
        this.server.emit('bot-message', cachedResponse);
      } else {
        const messages = [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message },
        ];

        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 1024,
        });

        if (response && response.choices && response.choices.length > 0) {
          const botResponse = response.choices[0].message.content;

          // Cache the response in Redis
          await this.redis.set(`cache_${message}`, botResponse); // Cache forever until we manually delete the data

          this.server.emit('bot-message', botResponse);

          // Store the user question and bot response in Firebase
          const firestore = firebaseAdmin.firestore();
          const chatRef = firestore.collection('Chats').doc();  // Use the 'Chats' collection
          await chatRef.set({
            userMessage: message,
            botResponse: botResponse,
            timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
          });
        } else {
          console.error('GPT-3 response was empty:', response);
        }
      }
    } catch (error) {
      console.error('Error generating response from GPT-3:', error);
    }
  }
}
