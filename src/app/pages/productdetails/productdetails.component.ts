import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { RepositoryService } from 'src/app/services/repository.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
   product: Product | undefined;
   prodcutStream? : Subscription;
   selectOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   amount: number = 1;

  constructor(
    private route: ActivatedRoute,
    private repo: RepositoryService
    ) { }

    ngOnInit(): void {

          // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
  
    console.log(productIdFromRoute)
    this.repo
        .getProducts()
        .then((productsProvider) => {
          this.prodcutStream = productsProvider.subscribe((products) => {
            this.product = products.find(product => product.id === productIdFromRoute);
          });
        })
        .catch((err) => {
          console.log("Error Calling repo from ProductListComponent");
        });
    }
  
  addToCart(){
    const amountInt = parseInt(this.amount + "");
    const cartItem = {
      product: this.product!,
      quantity: amountInt
    }

    // Reset value after adding
    this.amount = 1;
    this.repo.addToCart(cartItem);
    this.alertWithSuccess('Item Added To Cart!');
  }

  // Avoid Leaks
  ngOnDestroy(): void {
    this.prodcutStream?.unsubscribe();
  }

  alertWithSuccess(msg: string){  
    Swal.fire( msg , 'success')  
  }  
 
}
