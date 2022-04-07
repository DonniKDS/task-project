import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';
import { RoleService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {

    constructor(private readonly roleService: RoleService) {}

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200, type: [Role]})
    @Post()
    createRole(@Body() createRoleDto: CreateRoleDto) : Promise<Role> {
        return this.roleService.createRole(createRoleDto);
    }

    @ApiOperation({summary: 'Получение списка ролей'})
    @ApiResponse({status: 200, type: [Role]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getRoles() : Promise<Role[]> {
        return this.roleService.getAllRoles();
    }

    @ApiOperation({summary: 'Получение информации о роли по её названию'})
    @ApiResponse({status: 200, type: [Role]})
    @UseGuards(JwtAuthGuard)
    @Get('/value/:value')
    getRoleByValue(@Param('value') value: string) : Promise<Role> {
        return this.roleService.getRoleByValue(value);
    }
    
    @ApiOperation({summary: 'Получение информации о роли по её id'})
    @ApiResponse({status: 200, type: [Role]})
    @UseGuards(JwtAuthGuard)
    @Get('/id/:id')
    getRoleById(@Param('id') id: number) : Promise<Role> {
        return this.roleService.getRoleById(id);
    }
}   
