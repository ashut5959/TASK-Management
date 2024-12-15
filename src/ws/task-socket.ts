import { Server } from 'socket.io';

export class TaskSocket {
  io: Server;

  constructor(io: Server) {
    this.io = io;
    this.configureSocket();
  }

  private configureSocket() {
    this.io.on('connection', (socket) => {
      console.log('User connected');
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }
}
