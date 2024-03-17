import { 
    CanActivate, 
    ExecutionContext, 
    Injectable, 
    UnauthorizedException 
} from '@nestjs/common'
import { 
    JwtService
} from '@nestjs/jwt'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor ( private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token: string | null = request.cookies.token;

        // if there is no token;
        if (!token) throw new UnauthorizedException()

        // if there is token, we have to check the validity
        try {
            // const payload = await this.jwtService.verifyAsync
            return true;
            
        } catch (error) {
            throw new UnauthorizedException()
        }
    }
}