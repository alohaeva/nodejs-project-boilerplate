import { PostHelloMessage } from '../dtos/hello.ts';

export class HelloService {
  startTime: Date;

  constructor() {
    this.startTime = new Date();
  }

  handler(message: PostHelloMessage) {
    return `Hello World! from ${message.name}, ${this.startTime.toISOString()}`;
  }
}
