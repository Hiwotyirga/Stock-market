import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { User } from './user.entity';
import { jwtConstants } from './constants';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/Entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express'; // Import Express Request

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,private readonly usersService:UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            // Attach the user object to the request
            request['user'] = await this.usersService.findOne(payload.username);
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}