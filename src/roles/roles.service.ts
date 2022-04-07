import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';

@Injectable()
export class RoleService {

    constructor(@InjectModel(Role) private readonly roleRepisitory: typeof Role) {}

    async createRole(createRole: CreateRoleDto) : Promise<Role> {
        const role: Role = await this.roleRepisitory.create(createRole);
        return role;
    }

    async getAllRoles() : Promise<Role[]> {
        const roles: Role[] = await this.roleRepisitory.findAll();
        return roles;
    }

    async getRoleByValue(value: string) : Promise<Role> {
        const role: Role = await this.roleRepisitory.findOne({where: {value}});
        return role;
    }

    async getRoleById(id: number) : Promise<Role> {
        const role: Role = await this.roleRepisitory.findByPk(id);
        return role;
    }
}
