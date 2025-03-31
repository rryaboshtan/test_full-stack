import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { ConfigModule } from '@nestjs/config';
import * as cors from 'cors';

@Module({
  imports: [ConfigModule.forRoot(), RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          origin: ['https://myfrontend.com'], // Разрешить только этот домен
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization'],
        }),
      )
      .forRoutes('*');
  }
}
