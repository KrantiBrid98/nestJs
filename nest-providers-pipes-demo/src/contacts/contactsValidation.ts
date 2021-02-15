import { IsNotEmpty, Length, IsString, IsEmail  } from "class-validator";

export class ContactValidation {
    @IsNotEmpty()
    @Length(3,50)
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;
}