import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GetTaskReqDto } from './dtos/get-task.dto';
import {
  CreateTaskResp,
  CreateTaskRespSuccess,
  ErrorResponse,
} from 'src/shared/types/task-service.dto';
import { CreateTaskReqDto } from './dtos/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@Inject('TASK') private readonly taskClient: ClientProxy) {}

  async getTask(getTaskReq: GetTaskReqDto) {
    try {
      const result = await firstValueFrom(
        this.taskClient.send({ cmd: 'get_task' }, getTaskReq),
      );

      // Check if the result is an error response
      if ((result as ErrorResponse).statusCode) {
        throw new BadRequestException((result as ErrorResponse).message);
      }

      return result;
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error retrieving task: ' + error.message);
    }
  }

  async createTask(createTaskReq: CreateTaskReqDto): Promise<CreateTaskResp> {
    try {
      const result: CreateTaskResp | ErrorResponse = await firstValueFrom(
        this.taskClient.send({ cmd: 'create_task' }, createTaskReq),
      );

      // Check if the result is an error response
      if ((result as ErrorResponse).statusCode) {
        throw new BadRequestException((result as ErrorResponse).message);
      }

      return result as CreateTaskRespSuccess;
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error creating task: ' + error.message);
    }
  }
}
