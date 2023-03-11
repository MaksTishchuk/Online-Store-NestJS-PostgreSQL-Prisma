import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { StatisticsModule } from './statistics/statistics.module';
import { PaginationModule } from './pagination/pagination.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {AdminModule} from "@adminjs/nestjs";
import {PrismaService} from "./prisma.service";
import AdminJS from 'adminjs'
import * as AdminJSPrisma from '@adminjs/prisma'
import {DMMFClass} from "@prisma/client/runtime";

const DEFAULT_ADMIN = {
  email: 'maks@example.com',
  password: 'qwerty',
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database
})

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AdminModule.createAdminAsync({
      useFactory: () => {
        const prisma = new PrismaService()
        const dmmf = ((prisma as any)._baseDmmf as DMMFClass)
        return {
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              {
                resource: { model: dmmf.modelMap.User, client: prisma },
                options: {},
              },
              {
                resource: { model: dmmf.modelMap.Product, client: prisma },
                options: {}
              },
              {
                resource: { model: dmmf.modelMap.Category, client: prisma },
                options: {}
              },
              {
                resource: { model: dmmf.modelMap.Order, client: prisma },
                options: {}
              },
              {
                resource: { model: dmmf.modelMap.OrderItem, client: prisma },
                options: {}
              },
              {
                resource: { model: dmmf.modelMap.Review, client: prisma },
                options: {}
              },

            ],
          },
          auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'secret'
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret'
          }
        }
      },
    }),
    ServeStaticModule.forRoot({serveRoot: '/images', rootPath: path.resolve(__dirname, 'static')}),
    AuthModule,
    UserModule,
    ProductModule,
    ReviewModule,
    CategoryModule,
    OrderModule,
    StatisticsModule,
    PaginationModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
