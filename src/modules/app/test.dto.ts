import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Length } from "class-validator";

export class testDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;
    @IsNotEmpty()
    @Length(5, 10)
    @ApiProperty()
    pass: string;
}