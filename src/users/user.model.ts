import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/role.model";
import { UserRoles } from "src/roles/user-roles.model";
import { Task } from "src/tasks/task.model";
import { UserTasks } from "src/tasks/user-tasks.model";

interface UserCreationAttrs {
    login: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 'user_login', description: 'Имя учетной записи пользователя'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    login: string;

    @ApiProperty({example: 'user_password', description: 'Пароль от учетной записи пользователя'})
    @Column({ type: DataType.STRING, unique: false, allowNull: false })
    password: string;

    @BelongsToMany(() => Task, () => UserTasks)
    tasks: Task[];

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}