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
  
  fullname: string = "";
  address: string = "";
  creditCard: string = "";

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

 updateItemQuntity(cartItem: CartItem){
  if(cartItem.quantity == 0)
    this.removeItemFromCart(cartItem);
  else
    this.repo.updateQuantity(cartItem);

  this.calculateTotal();
 }

 removeItemFromCart(cartItem: CartItem){
  this.repo.removeItemFromCart(cartItem);
  location.reload();
 }

 calculateTotal(){
  this.totalMoney = 0;
  this.repo.getCart().forEach(it=>{
    this.totalMoney +=it.product.price * it.quantity;
  })
 }

 submitForm(){
  console.log("submitted")
 }}