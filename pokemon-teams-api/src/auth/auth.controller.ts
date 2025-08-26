// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const trainer = await this.authService.validateTrainer(
      loginDto.nome,
      loginDto.password,
    );
    if (!trainer) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authService.login(trainer);
  }
}
