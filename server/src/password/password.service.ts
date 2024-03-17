import { Injectable } from '@nestjs/common';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../repository/schema/user.schema';
import { Model } from 'mongoose';
import { StorePasswordDto } from './dto/store-password.dto';

@Injectable()
export class PasswordService {
  constructor (
    @InjectModel(User.name) private userCollection: Model<User>
  ) {}

  create(createPasswordDto: CreatePasswordDto) {
    try {
      // here we will get requirements as an array
      // and password length;
      const {
        requirements,
        passwordLength
      } = createPasswordDto;
  
      // first we are creating all chars to take randomly
      const uppercaseChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercaseChars: string = 'abcdefghijklmnopqrstuvwxyz';
      const numberChars: string = '0123456789';
      const specialChars: string = '!@#$%^&*()-_+=<>?';
  
      let charset = '';
      let password = '';
    
      // Ensure at least one character from each selected set
      if (requirements?.includes("uppercase")) {
        charset += uppercaseChars;
        password += uppercaseChars[Math.floor(Math.random() * 26)];
      }
      if (requirements?.includes("lowercase")) {
        charset += lowercaseChars;
        password += lowercaseChars[Math.floor(Math.random() * 26)];
      }
      if (requirements?.includes("numbers")) {
        charset += numberChars;
        password += numberChars[Math.floor(Math.random() * 10)];
      }
      if (requirements?.includes("special-chars")) {
        charset += specialChars;
        password += specialChars[Math.floor(Math.random() * 17)];
      }
  
      // we basically added single chars from each required type now we have to full fill the required length;
      for (let i: number = password.length; i < passwordLength; i++ ) {
        const randomIndex: number = Math.floor( Math.random() * charset.length)
        password += charset[randomIndex]
      } 
  
      // now we have completed all the requirements,then we have to shuffle it to ensure randomness.
      return {
        success: true,
        password: password.split('').sort(() => Math.random() - 0.5).join(''),
        message: "successfully created a new password with specified requirements"
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async findAll(userName: string) {
    try {
      const userDoc = await this.userCollection.findOne({
        userName: userName
      }, {
        storedPasswords: 1,
        _id: 0
      })
      return {
        success: true,
        message: "successfully fetched stored passwords of the user",
        passwords: userDoc.storedPasswords
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async storePassword(userName: string, passwordAndTitle: StorePasswordDto) {
    try {
      const updatedUserDocument = await this.userCollection.findOneAndUpdate(
        {
          userName
        }, {
          $push: {
            storedPasswords: passwordAndTitle
          }
        }, {
          new: true
        }
      )
  
      return {
        success: true,
        user: updatedUserDocument,
        message: "new password stored successfully "
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async remove(userName: string, id: string) {
    try {
      const updatedUserDocument = await this.userCollection.findOneAndUpdate(
        {
          userName
        }, {
          $pull: {
            storedPasswords: {
              _id: id
            }
          }
        }, {
          new: true
        }
      )
      return {
        success: true,
        message: "successfully removed one password from the collection",
        user: updatedUserDocument
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }
}
