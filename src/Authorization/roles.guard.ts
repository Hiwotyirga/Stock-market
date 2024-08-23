import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true; // If no roles are required, allow access
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; // Get the user from the request

        console.log('User Object:', user); // Log the user object

        if (!user || !user.rolename) {
            throw new ForbiddenException('User role is not defined');
        }

        console.log('User Role:', user.rolename); // Log the user's role
        console.log('Required Roles:', requiredRoles); // Log the required roles

        const hasRole = requiredRoles.some((role) => user.rolename === role);
        if (!hasRole) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return hasRole;
    }
}