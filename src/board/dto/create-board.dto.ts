import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  createdBy?: string | number;

  @IsNotEmpty()
  dateCreated?: Date;

  @IsNotEmpty()
  backgroundImage: string;
}
