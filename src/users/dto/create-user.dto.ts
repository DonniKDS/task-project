import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

const minPasswordLength = 6;
const maxPasswordLength = 64;

export class CreateUserDto {
    @ApiProperty({example: 'user_login', description: 'Имя учетной записи пользователя'})
    @IsString({message: 'Логин должен быть строкой'})
    readonly login: string;

    @ApiProperty({example: 'user_password', description: 'Пароль от учетной записи пользователя'})
    @IsString({message: 'Логин должен быть строкой'})
    @Length(minPasswordLength, maxPasswordLength, {message: `Пароль должен быть не меньше ${minPasswordLength} и не больше ${maxPasswordLength} символов`})
    readonly password: string;
}