/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { loggerMiddleWear } from './logger.middleware';
import { enableCors } from './cors.middleware';
import { ContactsController } from './contacts/contacts.controller';
import * as helmet from "helmet";

@Module({
  imports: [ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})

// way to inject or configure middleware
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // first apply middleware
    consumer.apply(helmet(), loggerMiddleWear, enableCors) // all the X- headers will be added by helmet()
      // use middleware for all below routes(can be many)
      // .forRoutes(ContactsController) // for all REST operations of '/contacts' route
      .forRoutes(
        {path:'/contacts/edit/:id', method: RequestMethod.PATCH},
        {path:'/contacts/*', method: RequestMethod.POST},
      )
    // .excludes also exists
  }
}
