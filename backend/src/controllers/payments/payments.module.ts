import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService, ProductsService],
  exports: [PaymentsService, PrismaService],
  imports: [PrismaModule, HttpModule],
})
export class PaymentsModule {}
