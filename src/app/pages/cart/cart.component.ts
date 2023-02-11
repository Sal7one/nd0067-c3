import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartitem.model';
import { RepositoryService } from 'src/app/services/repository.service';
import Swal from 'sweetalert2';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
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
  cartForm: FormGroup = new FormGroup({});
 constructor(
   private repo: RepositoryService,
   private router: Router,
   private fb: FormBuilder
      ) {
        this.cartForm = this.fb.group({
          fname: ['',[
           Validators.minLength(3),
           Validators.required
          ]],
          adress: ['',
          [Validators.minLength(10),
           Validators.required
          ]], 
          cc: ['',
           [Validators.minLength(16),
           Validators.required]
          ]
       })
      }

   ngOnInit(): void {
    this.updateData();
   }

   get formControls(){
    return this.cartForm.controls;
  }

 clearCart(){
  this.repo.cleartCart();
  this.updateData();
}

 updateItemQuntity(cartItem: CartItem){
  if(cartItem.quantity == 0)
    this.removeItemFromCart(cartItem);
  else
    this.repo.updateQuantity(cartItem);

    this.updateData();
 }

 removeItemFromCart(cartItem: CartItem){
  this.repo.removeItemFromCart(cartItem);
  this.alertWithSuccess("Item Removed from Cart");
  this.updateData();
 }

 calculateTotal(){
  this.totalMoney = 0;
  this.repo.getCart().forEach(it=>{
    this.totalMoney +=it.product.price * it.quantity;
  })
 }

 updateData(){
  this.cartItems = this.repo.getCart();
  this.calculateTotal();
 }

 submitForm(){

  console.log(this.fullname)
  // Validate as necessary 
  this.router.navigate(['/confirm', 
  { 
    customerName: this.fullname,
    total: this.totalMoney
  }]);
}

  alertWithSuccess(msg: string){  
    Swal.fire( msg , 'success')  
  }  
}