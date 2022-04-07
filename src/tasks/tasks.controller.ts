import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @ApiOperation({summary: 'Создание задачи'})
    @ApiResponse({status: 200, type: [Task]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/create/:user_id')
    createTask(@Param('user_id') user_id: number, @Body() task: CreateTaskDto) : Promise<Task> {
        return this.taskService.createTask(user_id, task);
    }

    @ApiOperation({summary: 'Получение задачи по её названию'})
    @ApiResponse({status: 200, type: [Task]})
    @UseGuards(JwtAuthGuard)
    @Get(':title')
    getTaskByTitle(@Param('title') title: string) : Promise<Task> {
        return this.taskService.getTaskByTitle(title);
    }

    @ApiOperation({summary: 'Обновление задачи'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Put('/update/:id')
    updateTask(@Param('id') id: number, @Body() UpdateTaskDto: UpdateTaskDto) : void {
        this.taskService.updateTask(id, UpdateTaskDto);
    }
}
