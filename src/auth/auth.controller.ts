import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUser } from './dto/login-user.dto';
import { Response } from 'express';
import { AddUser } from './dto/add-user.dto';
import { Cookies } from 'src/cookies.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async authenticate(
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginUser,
  ) {
    try {
      const redisKey = await this.authService.authenticateUser(body);
      res.cookie('authKey', redisKey, {
        httpOnly: true,
        sameSite: 'strict',
        secure: !(process.env.NODE_ENV === 'development'),
        path: '/',
      });
      return {
        status: 'success',
        data: 'you have been logged in successfully',
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Post('/register')
  async addNewUser(
    @Res({ passthrough: true }) res: Response,
    @Body() body: AddUser,
  ) {
    try {
      const redisKey = await this.authService.addNewUser(body);
      res.cookie('authKey', redisKey, {
        httpOnly: true,
        sameSite: 'strict',
        secure: !(process.env.NODE_ENV === 'development'),
        path: '/',
      });
      return {
        status: 'success',
        data: 'Thanks for trusting us, you have been logged in successfully',
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Get('me')
  async me(@Cookies('authKey') authKey: string) {
    try {
      const user = await this.authService.me(authKey);
      if (!user) {
        throw new HttpException({ message: 'Unauthorized' }, 500);
      }
      return { status: 'success', data: user };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Post('/logout')
  async logout(
    @Cookies('authKey') authKey: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      await this.authService.logout(authKey);
      res.clearCookie('authKey');
      return { status: 'success', data: 'logged out successfully' };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }
}
