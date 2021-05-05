import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { User } from './entities';
import { AuthController } from './controllers';
import { AuthService, JwtStrategy, UserService } from './services';
import { authConfig, dbConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: authConfig.secret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
})
export class AppModule {}
