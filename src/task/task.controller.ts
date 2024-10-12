import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { GetTaskReqDto, GetTaskRespDto } from './dtos/get-task.dto';
import { ErrorResponse } from 'src/shared/types/task-service.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async getTask(
    @Query() getTaskReq: GetTaskReqDto,
  ): Promise<GetTaskRespDto[] | ErrorResponse> {
    return this.taskService.getTask(getTaskReq);
  }
}
