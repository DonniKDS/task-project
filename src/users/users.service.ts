import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/role.model';
import { RoleService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User) private readonly userRepository: typeof User, 
        private readonly roleService: RoleService
    ) {}

    async createUser(createUser: CreateUserDto) : Promise<User> {
        const user: User = await this.userRepository.create(createUser);
        const role: Role = await this.roleService.getRoleByValue('USER');
        user.$set('roles', [role]);
        return user;
    }

    async getAllUsers() : Promise<User[]> {
        const users: User[] = await this.userRepository.findAll({include: {model: Role}});
        return users;
    }

    async getUserById(id: number) : Promise<User> {
        const user: User = await this.userRepository.findByPk(id, { include: {all: true} });
        return user;
    }

    async getUserByLogin(login: string) : Promise<User> {
        const user: User = await this.userRepository.findOne({where: {login}});
        return user;
    }

    async addRole(addRoleDto: AddRoleDto) {
        const user: User = await this.userRepository.findByPk(addRoleDto.user_id);
        const role: Role = await this.roleService.getRoleByValue(addRoleDto.value);
        if (role && user) {
            await user.$add('roles', role.id);
            return user;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }
}
