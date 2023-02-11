import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/models/cartitem.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

selectOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
amount: number = 1;
@Input() product!: Product | undefined;
@Output() addToCartEvent= new EventEmitter<CartItem>();

addToCartRequest(){
    
    const amountInt = parseInt(this.amount + "");
    const cartItem = {
      product: this.product!,
      quantity: amountInt
    }

    this.addToCartEvent.emit(cartItem);

    // Reset value after adding
    this.amount = 1;
  }
}
