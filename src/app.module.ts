import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@users/users.module';
import { AuthenticationModule } from '@authentication/authentication.module';
import { AddressesModule } from '@addresses/addresses.module';
import { ClientsModule } from '@clients/clients.module';
import { OrdersModule } from '@orders/orders.module';
import { PaymentsModule } from '@payments/payments.module';
import { CategoriesModule } from '@categories/categories.module';
import { ProductsModule } from '@products/products.module';
import { PurchasesModule } from '@purchases/purchases.module';
import { UploadsModule } from '@uploads/uploads.module';
import { PhotosModule } from '@photos/photos.module';
import { RevenueChartModule } from '@charts/revenue-chart/revenue-chart.module';
import { CategoriesPieModule } from '@charts/categories-pie/categories-pie.module';
import { OrdersStatusesChartModule } from '@charts/orders-statuses-chart/orders-statuses-chart.module';
import { OrdersCountChartModule } from '@charts/orders-count-chart/orders-count-chart.module';
import { CartModule } from '@appcarts/cart.module';
import { ormConfig } from './ormconfig';
import { WishlistModule } from '@appwishlists/wishlists.module';
import { CustomizeUploadsModule } from '@appcustomize-uploads/customize-uploads.module';
import { ReviewsModule } from '@appreviews/reviews.module';
import { OptionsModule } from '@appoptions/option.module';
import { VariantsModule } from '@appvariants/variant.module';
import { CollectionModule } from '@appcollections/collections.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    AuthenticationModule,
    AddressesModule,
    ClientsModule,
    OrdersModule,
    PaymentsModule,
    CategoriesModule,
    ProductsModule,
    PurchasesModule,
    UploadsModule,
    PhotosModule,
    RevenueChartModule,
    CategoriesPieModule,
    OrdersStatusesChartModule,
    OrdersCountChartModule,
    CartModule,
    WishlistModule,
    CustomizeUploadsModule,
    ReviewsModule,
    OptionsModule,
    VariantsModule,
    CollectionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
