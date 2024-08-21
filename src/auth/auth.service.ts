import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    name: string,
    password: string,
    session: any,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(name);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Incorrect password');
    }
    const payload = { sub: user.id, username: user.name };

    // Store user details in session
    session.user = user;

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signInAdmin(
    name: string,
    password: string,
    session: any,
  ): Promise<{ access_token: string }> {
    const admin = await this.usersService.findOneAdmin(name);
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }
    if (admin.password !== password) {
      throw new UnauthorizedException('Incorrect password');
    }
    const payload = { sub: admin.id, username: admin.name };

    // Store admin details in session
    session.admin = admin;

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
