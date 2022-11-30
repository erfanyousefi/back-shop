import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateRoleDTO {
    @IsNotEmpty()
    @Length(3)
    @ApiProperty({default: "user", required: true})
    role: string;
}