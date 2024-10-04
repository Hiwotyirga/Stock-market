import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; role: string }> {
    const user = await this.usersService.findOne(username);
    
    console.log("User retrieved:", user); // Check the retrieved user
    
    if (!user) {
      console.log(`No user found with username: ${username}`);
      throw new UnauthorizedException('Invalid username or password');
    }
  
    if (user.password !== pass) {
      console.log(`Password mismatch for user: ${username}`);
      throw new UnauthorizedException('Invalid username or password');
    }
  
    console.log("Role before signing token:", user.role);
    
    const payload = {
      username: user.name,
      sub: user.id,
      role: user.role,
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
      role: user.role,
    };
  }
  

  async logout(userId: string): Promise<{ message: string }> {
    // Any logic needed for logout
    return { message: 'Successfully logged out' };
  }
}
