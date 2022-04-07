import { Module } from '@nestjs/common';
import { RoleService } from './roles.service';
import { RoleController } from './roles.controller';
import { Role } from './role.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRoles } from './user-roles.model';
import { User } from 'src/users/user.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles]),
    AuthModule
  ],
  exports: [
    RoleService
  ]
})
export class RoleModule {}
