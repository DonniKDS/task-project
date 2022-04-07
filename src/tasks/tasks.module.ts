import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.model';
import { User } from 'src/users/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserTasks } from './user-tasks.model';
import { UserModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    SequelizeModule.forFeature([User, Task, UserTasks]),
    UserModule,
    AuthModule
  ]
})
export class TasksModule {}
