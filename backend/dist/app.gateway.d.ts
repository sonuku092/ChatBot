import { Server } from 'socket.io';
export declare class AppGateway {
    server: Server;
    handleMessage(message: string): string;
}
