import { IsNotEmpty } from "class-validator"

export class CreateColumnCardDto {
	@IsNotEmpty()
	userId: string;

	@IsNotEmpty()
	dateCreated: string

	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	type: string;

	@IsNotEmpty()
	description: string;

	@IsNotEmpty()
	sequence: string
}
