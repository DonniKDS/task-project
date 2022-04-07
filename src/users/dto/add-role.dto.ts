import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class AddRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Название роли'})
    @IsString({ message: 'Должно быть строкой' })
    readonly value: string;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly user_id: number;
}