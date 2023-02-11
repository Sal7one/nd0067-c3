import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartitem.model';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems : CartItem[] = [];
  totalMoney: number = 0;

 constructor(
   private repo: RepositoryService
   ) { }

   ngOnInit(): void {
    this.cartItems = this.repo.getCart();
    this.calculateTotal();
   }
 
 clearCart(){
  this.repo.cleartCart();
  location.reload();
 }

 updateItemQuntity(cartItem: CartItem, quantity: number){
  this.repo.updateQuantity(cartItem, quantity);
  this.calculateTotal();
 }

 removeItemFromCart(cartItem: CartItem){
  this.repo.removeItemFromCart(cartItem);
  this.calculateTotal();
 }

 calculateTotal(){
  this.repo.getCart().forEach(it=>{
    this.totalMoney +=it.product.price;
  })
 }
}