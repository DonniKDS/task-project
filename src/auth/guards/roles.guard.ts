import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { User } from "src/users/user.model";
import { ROLES_KEY } from "../roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    
    constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            if (!requiredRoles) {
                return true;
            }
            const req: any = context.switchToHttp().getRequest();
            const authHeader: string = req.headers.authorization;
            const bearer: string = authHeader.split(' ')[0];
            const token: string = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'User is not authorized'});
            }
            const user: User = this.jwtService.verify(token);
            req.user = user;
            return user.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            throw new HttpException('No access', HttpStatus.FORBIDDEN)
        }
    }
}