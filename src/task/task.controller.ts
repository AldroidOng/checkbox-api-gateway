import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { GetTaskReqDto, GetTaskRespDto } from './dtos/get-task.dto';
import {
  CreateTaskRespSuccess,
  UpdateTaskRespSuccess,
} from 'src/shared/types/task-service.dto';
import { CreateTaskReqDto, CreateTaskRespDto } from './dtos/create-task.dto';
import { UpdateTaskReqDto, UpdateTaskRespDto } from './dtos/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async getTask(@Query() getTaskReq: GetTaskReqDto): Promise<GetTaskRespDto[]> {
    return this.taskService.getTask(getTaskReq);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(
    @Body() createTaskReq: CreateTaskReqDto,
  ): Promise<CreateTaskRespDto> {
    try {
      const result = await this.taskService.createTask(createTaskReq);
      return (result as CreateTaskRespSuccess).taskId;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  async updateTask(
    @Body() updateTaskReq: UpdateTaskReqDto,
  ): Promise<UpdateTaskRespDto> {
    try {
      const result = await this.taskService.updateTask(updateTaskReq);
      return (result as UpdateTaskRespSuccess).taskId;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
