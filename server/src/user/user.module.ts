import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema, { User } from 'src/repository/schema/user.schema';
import { JwtService } from 'src/utils/jwt/jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
