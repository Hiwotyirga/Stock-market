import { Body, Controller, Post, HttpCode, HttpStatus, Session } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: { name: string; password: string }, @Session() session: any) {
    return this.authService.signIn(signInDto.name, signInDto.password, session);
  }

  @Post('login/admin')
  async signInAdmin(@Body() signInDto: { name: string; password: string }, @Session() session: any) {
    return this.authService.signInAdmin(signInDto.name, signInDto.password, session);
  }
}
