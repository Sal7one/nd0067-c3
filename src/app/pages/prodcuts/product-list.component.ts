import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { Subscription } from 'rxjs';

import { RepositoryService } from "src/app/services/repository.service";
import { CartItem } from "src/app/models/cartitem.model";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  constructor(private repo: RepositoryService) {}

  prodcutStream? : Subscription;
  products: Product[] = [];
  ngOnInit(): void {
    this.repo
      .getProducts()
      .then((productsProvider) => {
        this.prodcutStream = productsProvider.subscribe((products) => {
          this.products = products;
        });
      })
      .catch((err) => {
        console.log("Error Calling repo from ProductListComponent");
      });
  }

  addToCart(cartItem : CartItem){
    this.repo.addToCart(cartItem);
  }

  // Avoid Leaks
  ngOnDestroy(): void {
    this.prodcutStream?.unsubscribe();
  }
}
