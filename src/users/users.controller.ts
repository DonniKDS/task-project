import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UserService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @ApiOperation({summary: 'Получение списка пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getUsers() : Promise<User[]> {
        return this.userService.getAllUsers();
    }
    
    @ApiOperation({summary: 'Получение информации о пользователе по его id'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUserById(@Param('id') id: number) : Promise<User> {
        return this.userService.getUserById(id);
    }

    @ApiOperation({summary: 'Выдать роль'})
    @ApiResponse({status: 200})
    @Post('/role')
    addRole(@Body() addRoleDto: AddRoleDto) : Promise<User> {
        return this.userService.addRole(addRoleDto);
    }
}
