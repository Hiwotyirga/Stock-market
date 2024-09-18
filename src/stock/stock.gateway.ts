// import {
//     WebSocketGateway,
//     WebSocketServer,
//     OnGatewayInit,
//     OnGatewayConnection,
//     OnGatewayDisconnect,
//   } from '@nestjs/websockets';
//   import { Server, Socket } from 'socket.io';
//   import { StockService } from './stock.service';
  
//   @WebSocketGateway({
//     cors: {
//       origin: '*', // Allow all origins for testing
//     },
//   })
//   export class StockGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
//     @WebSocketServer() server: Server;
  
//     constructor(private stockService: StockService) {}
  
//     afterInit(server: Server) {
//       console.log('WebSocket Initialized');
//     }
  
//     handleConnection(client: Socket) {
//       console.log(`Client connected: ${client.id}`);
//     }
  
//     handleDisconnect(client: Socket) {
//       console.log(`Client disconnected: ${client.id}`);
//     }
  
//     async sendRealTimeUpdates(symbol: string) {
//       setInterval(async () => {
//         const stockPrice = await this.stockService.getRealTimeStockPrice(symbol);
//         this.server.emit('stockPriceUpdate', stockPrice);
//       }, 10000); // Update every 10 seconds
//     }
//   }