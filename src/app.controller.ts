import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @Get('profile')
  async login(@Req() req) {
    console.log('profile', req.user);
    return 'profile 페이지 입니다';
  }
}
