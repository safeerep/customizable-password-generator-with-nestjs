import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // values from environments;
  const configService = app.get(ConfigService)
  const PORT: number = configService.get<number>("PORT")
  const CLIENT_URL: string = configService.get<string>("CLIENT_URL")
  const GLOBAL_PREFIX: string = configService.get<string>("GLOBAL_PREFIX")
  
  // global
  app.use(cookieParser())
  app.setGlobalPrefix(GLOBAL_PREFIX)
  app.enableCors({
    origin: CLIENT_URL,
    credentials: true
  })

  await app.listen(PORT, () => {
    console.log(`yes safeer app started at the port ${PORT}`);
  });
}

bootstrap();
