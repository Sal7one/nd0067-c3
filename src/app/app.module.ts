import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProductItemComponent } from './components/./product-item/product-item.component';
import { ProductItemDetailComponent } from './components/./product-item-detail/product-item-detail.component';
import { ProductListComponent } from './components/./product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationComponent,
    ProductItemComponent,
    ProductItemDetailComponent,
    ProductListComponent,
    CartComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
