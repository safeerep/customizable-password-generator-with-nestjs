import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { PasswordService } from './password.service';
import { CreatePasswordDto } from './dto/create-password.dto';
import { JwtService } from 'src/utils/jwt/jwt.service';
import { Request } from 'express';
import { StorePasswordDto } from './dto/store-password.dto';

@Controller()
export class PasswordController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) { }

  @Post('/generate-password')
  create(@Body() createPasswordDto: CreatePasswordDto) {
    return this.passwordService.create(createPasswordDto);
  }

  @Post('/store-password')
  async store(@Body() storePasswordDto: StorePasswordDto, @Req() request: Request) {
    // first we have to get userName to store password in user' doc;
    const token: string = request.cookies.token;
    const userName: string | boolean = await this.jwtService.destructureToken(token)
    if (userName) {
      return this.passwordService.storePassword(String(userName), storePasswordDto);
    }
    // else 
    return {
      success: false,
      message: "sorry, login first to continue"
    }
  }

  @Get('/retrieve-passwords')
  async findAll(@Req() request: Request) {
    // for to find all the passwords of current user, we have to get userId first.
    const token: string = request.cookies.token;
    const userName: string | boolean = await this.jwtService.destructureToken(token)
    if (userName) {
      return this.passwordService.findAll(String(userName));
    }
    // else 
    return {
      success: false,
      message: "sorry, login first to continue"
    }
  }

  @Delete('/remove-password/:id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    // first we have to get userName to remove password from user' doc;
    const token: string = request.cookies.token;
    const userName: string | boolean = await this.jwtService.destructureToken(token)
    if (userName) {
      return this.passwordService.remove(String(userName), id);
    }
    // else 
    return {
      success: false,
      message: "sorry, login first to continue"
    }
  }
}
