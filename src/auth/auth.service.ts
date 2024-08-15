import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(name: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(name);
    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };  // Ensure the properties are correct
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
