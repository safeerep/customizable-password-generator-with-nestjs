import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { JwtService } from 'src/utils/jwt/jwt.service';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema, { User } from 'src/repository/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema
      }
    ])
  ],
  controllers: [PasswordController],
  providers: [PasswordService, JwtService],
})
export class PasswordModule {}
