import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ErrorResponse } from 'src/shared/types/task-service.dto';

export class UpdateTaskReqDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  taskId: string;

  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  taskDesc: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}

export type UpdateTaskRespDto = string | ErrorResponse;
