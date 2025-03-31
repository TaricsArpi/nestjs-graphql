import { Controller, Post, Body, Get } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('produce')
  async produceMessage(@Body() body: { topic: string; message: string }) {
    await this.kafkaService.produceMessage(body.topic, body.message);
    return { status: 'Message sent' };
  }

  @Get('consume')
  async consumeMessage() {
    const messages: string[] = [];

    await this.kafkaService.consumeMessages('test-topic', (message) => {
      messages.push(message);
    });

    return messages;
  }
}