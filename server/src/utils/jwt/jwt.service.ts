import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken"
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtService {
    constructor (
        private readonly configService: ConfigService
    ) {}
    generateToken(userName: string) {
        const SECRET: string = this.configService.get<string>("JWT_TOKEN_SECRET")
        return jwt.sign(
            { user: userName }, SECRET as jwt.Secret, { expiresIn: '30d' }
        )
    }

    destructureToken(token: string):Promise<string | boolean> {
        return new Promise((resolve) => {
            const SECRET: string = this.configService.get<string>("JWT_TOKEN_SECRET")
            jwt.verify(token, SECRET, (err: any, decodedUser: any) => {
                if (err) resolve(false);
                else {
                    resolve(decodedUser?.user);
                }
            });
        })
    }

    verifyToken(token: string): Promise<boolean> {
        return new Promise((resolve) => {
            const SECRET: string = this.configService.get<string>("JWT_TOKEN_SECRET")
            jwt.verify(token, SECRET, (err: any, decodedUser: any) => {
                if (err) resolve(false);
                else {
                    resolve(true);
                }
            });
        })
    }
}