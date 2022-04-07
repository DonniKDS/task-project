import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { UserService } from 'src/users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';

@Injectable()
export class TasksService {

    constructor(
        @InjectModel(Task) private readonly taskRepository: typeof Task, 
        private readonly userService: UserService
    ) {}

    async createTask(user_id: number, createTaskDto: CreateTaskDto) : Promise<Task> {
        const user: User = await this.userService.getUserById(user_id);
        const task: Task = await this.taskRepository.create(createTaskDto);
        await user.$add('tasks', [task.id]);
        return task ;
    }

    async getTaskByTitle(title: string): Promise<Task> {
        const task: Task = await this.taskRepository.findOne({where: {title}});
        return task;
    }

    async updateTask(id: number, updateTask: UpdateTaskDto) : Promise<void> {
        await this.taskRepository.update(updateTask, {where: {id}, returning: true});
    }
}
