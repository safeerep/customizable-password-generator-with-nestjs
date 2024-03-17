import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../repository/schema/user.schema'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userCollection: Model<User>
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const {
        password
      } = createUserDto;
      createUserDto.password = await bcrypt.hash(password, 10)
      const newUser = await this.userCollection.create(createUserDto)
      if (newUser) {
        return {
          user: newUser,
          message: "successfully created account"
        }
      }
      // else
      return {
        message: "something went wrong"
      }
    } catch (error) {
      if (error.code === 11000) {
        return {
          message: "username already exists"
        }
      }

      return {
        message: error
      }
    }

  }

  async login(loginUserDto: CreateUserDto) {
    try {
      const {
        userName,
        password
      } = loginUserDto;
      // now we have to check password is matching or not;
      const userDoc = await this.userCollection.findOne({
        userName: userName
      })

      if (userDoc) {
        const passwordMatching: boolean = bcrypt.compareSync( password, userDoc.password)
        if (passwordMatching) {
          return {
            user: userDoc,
            message: "successfully logged in"
          }
        } else {
          return {
            message: "Invalid password"
          }
        }
      } else {
        return {
          message: "Invalid credentials"
        }
      }
    } catch (error) {
      return {
        message: error
      };
    }
  }
}
