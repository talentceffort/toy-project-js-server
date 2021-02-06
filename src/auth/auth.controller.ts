import { Controller, Post, UseGuards, Get, Req, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { User } from './get-user.decorator';
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

  @Post('google/login')
  async googleLogin(@Body() data: Record<'token', string>) {
    return this.authService.googleLogin(data.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  // @UseGuards(GoogleAuthGuard)
  // @Get('google')
  // async googleLogin() {
  //   return null;
  // }

  // @Get('google/callback')
  // @UseGuards(GoogleAuthGuard)
  // async googleRedirect(@Req() req, @Res() res: Response) {
  //   const { access_token } = req.user;
  //   res.redirect(`http://localhost:3000/token/access_token?=${access_token}`);
  // }
}
