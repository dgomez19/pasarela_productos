import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsService } from './controllers/products/products.service';
import { ProductsModule } from './controllers/products/products.module';
import { PaymentsController } from './controllers/payments/payments.controller';
import { PaymentsService } from './controllers/payments/payments.service';
import { PaymentsModule } from './controllers/payments/payments.module';

@Module({
  imports: [ProductsModule, PaymentsModule],
  controllers: [AppController, ProductsController, CategoriesController, PaymentsController],
  providers: [AppService, ProductsService, PaymentsService],
})
export class AppModule {}
