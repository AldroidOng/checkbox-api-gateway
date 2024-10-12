import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetTaskReqDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class GetTaskRespDto {
  taskName: string;
  taskDesc: string;
  dueDate: string;
  createdAt: string;
}
