import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiOperation({summary: 'Авторизация пользователя'})
    @ApiResponse({status: 200, type: [TokenDto]})
    @Post('/login')
    login(@Body() userDto: CreateUserDto): Promise<TokenDto> {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @ApiResponse({status: 200, type: [TokenDto]})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) : Promise<TokenDto> {
        console.log("userDto: ", userDto)
        return this.authService.registration(userDto);
    }
}
