import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ILoginUser, IRegisterUser } from '../interfaces/interfaces';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  @HttpCode(200)
  async loginUser(@Body() loginUser: ILoginUser): Promise<{ token: string }> {
    if (
      await this.authService.validateUser(loginUser.login, loginUser.password)
    ) {
      const user = await this.authService.getUserByLogin(loginUser.login);
      const payload = {
        id: user.id,
        login: user.login,
      };

      return {
        token: this.jwtService.sign(payload),
      };
    }

    throw new HttpException(
      'Wrong login or password!',
      HttpStatus.UNAUTHORIZED,
    );
  }

  @Post('/register')
  @HttpCode(200)
  async registerUser(
    @Body() registerUser: IRegisterUser,
  ): Promise<{ token: string }> {
    console.log('registerUser', registerUser);
    const user = await this.authService.getUserByLogin(registerUser.login);
    if (user) {
      const payload = {
        id: user.id,
        login: user.login,
      };

      return {
        token: this.jwtService.sign(payload),
      };
    }
  }
}
