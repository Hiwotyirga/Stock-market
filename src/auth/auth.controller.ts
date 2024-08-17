import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: { name: string; password: string }) {
    return this.authService.signIn(signInDto.name, signInDto.password);
  }

  @Post('login/admin')
  async signInAdmin(@Body() signInDto: { name: string; password: string }) {
    return this.authService.signInAdmin(signInDto.name, signInDto.password);
  }
}
