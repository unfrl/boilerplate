import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthDto, SignUpDto, SignInDto } from '../dtos';
import { authConfig } from '../config';
import { JwtPayload } from '../interfaces';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService
  ) {}

  public async signIn(signInDto: SignInDto): Promise<AuthDto> {
    const { email, password } = signInDto;
    const lowerCaseEmail = email.toLowerCase();

    const user = await this._userService.findOneByEmail(lowerCaseEmail);
    if (!user) {
      throw new HttpException(
        "That email doesn't match an existing account.",
        HttpStatus.BAD_REQUEST
      );
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new HttpException("The email and password don't match.", HttpStatus.BAD_REQUEST);
    }

    if (!user.isVerified) {
      throw new HttpException("Your account hasn't been verified yet.", HttpStatus.BAD_REQUEST);
    }

    return this.generateAccessToken(user.id);
  }

  public async signUp(signUpDto: SignUpDto): Promise<void> {
    const { email, password, displayName } = signUpDto;
    const lowerCaseEmail = email.toLowerCase();

    const existing = await this._userService.findOneByEmail(lowerCaseEmail);
    if (existing) {
      throw new HttpException('That email address is already in use.', HttpStatus.BAD_REQUEST);
    }

    const trimmedDisplayName = displayName.trim();
    if (!trimmedDisplayName) {
      throw new HttpException('Display name cannot be blank.', HttpStatus.BAD_REQUEST);
    }

    if (await this._userService.displayNameExists(trimmedDisplayName)) {
      throw new HttpException('Display name already in use.', HttpStatus.BAD_REQUEST);
    }

    const hashed = await bcrypt.hash(password, authConfig.saltOrRounds);
    await this._userService.createUser(lowerCaseEmail, hashed, trimmedDisplayName);
  }

  public async generateAccessToken(userId: string): Promise<AuthDto> {
    const tokenPayload: JwtPayload = { sub: userId };
    const token = this._jwtService.sign(tokenPayload);

    return {
      accessToken: token,
    };
  }
}
