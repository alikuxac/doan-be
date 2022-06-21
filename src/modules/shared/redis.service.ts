import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redis from 'redis';

@Injectable()
export class RedisService {
  private client: redis.RedisClientType;
  private isConnected = false;
  constructor(private readonly configService: ConfigService) {}

  async connect() {
    this.client = redis.createClient({
      url: this.configService.get('REDIS_URL'),
      password: this.configService.get('REDIS_PASSWORD'),
    });

    this.client.on('connect', () => console.log('Redis is connecting'));

    this.client.on('ready', () => {
      this.isConnected = true;
      console.log('Redis connected');
    });

    this.client.on('end', () => console.log('Redis disconnected'));

    this.client.on('error', (err) => console.error(err));

    this.client.on('reconnecting', () => console.log('Redis is reconnecting'));

    await this.client.connect();
  }

  private assertHasConnected() {
    if (!this.isConnected) {
      throw new InternalServerErrorException(
        'A connection to Redis has not been established',
      );
    }
  }

  async setPasscode(email: string, value: string) {
    this.assertHasConnected();

    return this.client.setEx(`passcode:${email}`, 300, value);
  }

  async getPasscode(email: string) {
    this.assertHasConnected();

    return this.client.get(`passcode:${email}`);
  }

  async deletePasscode(email: string) {
    this.assertHasConnected();

    return this.client.del(`passcode:${email}`);
  }
}
