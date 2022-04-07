import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from 'src/tasks/task.model';
import { UserTasks } from 'src/tasks/user-tasks.model';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/role.model';
import { UserRoles } from 'src/roles/user-roles.model';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([User, Task, UserTasks, Role, UserRoles]),
    forwardRef(() => AuthModule),
    RoleModule
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
