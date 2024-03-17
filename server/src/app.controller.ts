import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/safeer')
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('/health')
  checkHealth(): object {
    return this.appService.checkHealth()
  }
}
