import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.model';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}
    
    public async login(userDto: CreateUserDto) : Promise<TokenDto> {
        const user: User = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    public async registration(userDto: CreateUserDto) : Promise<TokenDto> {
        const candidate: User = await this.userService.getUserByLogin(userDto.login);
        if (candidate) {
            throw new HttpException('User with this login is already registered', HttpStatus.BAD_REQUEST);
        }
        const passwordHash: string = await bcrypt.hash(userDto.password, 5);
        const user: User = await this.userService.createUser({ ...userDto, password: passwordHash });
        return this.generateToken(user);
    }

    private generateToken(user: User) : TokenDto {
        const payload = { login: user.login, id: user.id };
        return <TokenDto> { token: this.jwtService.sign(payload) };
    }

    private async validateUser(userDto: CreateUserDto) : Promise<User> {
        const user: User = await this.userService.getUserByLogin(userDto.login);
        const isPasswordEquels: boolean = await bcrypt.compare(userDto.password, user.password);
        if (user && isPasswordEquels) {
            return user;
        }
        throw new UnauthorizedException({message: 'Incorrect password or login'});
    }
}
