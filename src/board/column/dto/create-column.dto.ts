import { IsDate, IsNotEmpty } from "class-validator";

export class CreateColumnDto {
  @IsNotEmpty()
  boardName: string;

  @IsNotEmpty()
  dateCreated: Date;

  @IsNotEmpty()
  columnName: string;

  @IsNotEmpty()
  userId: string | number;

  @IsNotEmpty()
  sequence: string | number;
}
