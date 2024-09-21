import { Server } from './src/server.ts';

const server = new Server();

server.start().then(() => {
  console.log('started');
});
