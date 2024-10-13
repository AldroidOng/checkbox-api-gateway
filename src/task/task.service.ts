import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GetTaskReqDto } from './dtos/get-task.dto';
import {
  CreateTaskResp,
  CreateTaskRespSuccess,
  ErrorResponse,
  UpdateTaskPayload,
  UpdateTaskResp,
  UpdateTaskRespSuccess,
} from 'src/shared/types/task-service.dto';
import { CreateTaskReqDto } from './dtos/create-task.dto';
import { UpdateTaskReqDto } from './dtos/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@Inject('TASK') private readonly taskClient: ClientProxy) {}

  async getTask(getTaskReq: GetTaskReqDto) {
    try {
      const result = await firstValueFrom(
        this.taskClient.send({ cmd: 'get_task' }, getTaskReq),
      );

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

      if ((result as ErrorResponse).statusCode) {
        throw new BadRequestException((result as ErrorResponse).message);
      }

      return result as CreateTaskRespSuccess;
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error creating task: ' + error.message);
    }
  }

  async updateTask(updateTaskReq: UpdateTaskReqDto): Promise<UpdateTaskResp> {
    try {
      const payload: UpdateTaskPayload = updateTaskReq;

      const result: UpdateTaskResp | ErrorResponse = await firstValueFrom(
        this.taskClient.send({ cmd: 'update_task' }, payload),
      );

      if ((result as ErrorResponse).statusCode) {
        throw new BadRequestException((result as ErrorResponse).message);
      }

      return result as UpdateTaskRespSuccess;
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error creating task: ' + error.message);
    }
  }
}
