import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateTaskDto {
    @ApiProperty({example: 'Создать тестовый проект', description: 'Название задачи'})
    @IsString({ message: 'Должно быть строкой' })
    readonly title: string;

    @ApiProperty({example: 'Создать тестовый проект используя фреймворк NestJs.', description: 'Опизание задачи'})
    @IsString({ message: 'Должно быть строкой' })
    readonly description: string;
}