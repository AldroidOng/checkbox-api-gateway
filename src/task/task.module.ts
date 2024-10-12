import { Module } from '@nestjs/common';
import { ClientOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '../shared/config/config.module';
import { ConfigService } from '@nestjs/config';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'TASK',
        useFactory: (configService: ConfigService): ClientOptions => ({
          transport: Transport.TCP,
          options: {
            host:
              configService.get<string>('TASK_MICROSERVICE_HOST') ||
              'localhost',
            port:
              parseInt(
                configService.get<string>('TASK_MICROSERVICE_PORT'),
                10,
              ) || 3001,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
