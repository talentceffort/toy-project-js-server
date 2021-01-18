import { Controller, Post, UseGuards, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { User } from './get-user.decorator';
import { GoogleAuthGuard } from './google-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.localLogin(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleLogin() {
    return null;
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Res() res: Response) {
    return res.redirect('http://localhost:3000');
  }

  @Post('google/login/success')
  @UseGuards(JwtAuthGuard)
  async googleLoginSuccess(@Req() req, @Res() res, @User() user) {
    console.log('login/success/', req.user);
    console.log(user);
    if (req.user) {
      return res.user;
    }
  }
}
