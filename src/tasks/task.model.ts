import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UserTasks } from "./user-tasks.model";

interface TaskCreationAttrs {
    login: string;
    password: string;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 'Создать тестовый проект', description: 'Название задачи'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string;

    @ApiProperty({example: 'Создать тестовый проект используя фреймворк NestJs.', description: 'Опизание задачи'})
    @Column({ type: DataType.STRING, unique: false, allowNull: false })
    description: string;

    @BelongsToMany(() => User, () => UserTasks)
    users: User[];
}