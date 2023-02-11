import { Injectable } from "@angular/core";
import { CartItem } from "../models/cartitem.model";
import { Product } from "../models/product.model";
import { Observable, BehaviorSubject, firstValueFrom } from "rxjs";
import { LocalDbService } from "./local-db.service";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class RepositoryService {
  products = new BehaviorSubject<Product[]>([]);
  cartStream = new BehaviorSubject<CartItem[]>([]);
  savedProductsStream = new BehaviorSubject<Product[]>([]);

  PRODUCTS_API: string = `https://raw.githubusercontent.com/udacity/nd-0067-c3-angular-fundamentals-project-starter/main/src/assets/data.json`;
  constructor(
    private localDB: LocalDbService,
    private httpClient: HttpClient
  ) {}

  async getProducts(): Promise<Observable<Product[]>> {
    // Simple Cache Logic - Every 5 minutes request the data to be updated
    let cacheEpoch = this.localDB.get("cache_epoch");
    if (cacheEpoch == null || this.isCacheExpired(cacheEpoch))
      await this.requestCacheUpdate();

    // Single Source Of Truth :P
    const savedProducts: Product[] = JSON.parse(
      this.localDB.get("products") as string
    );
    this.savedProductsStream.next(savedProducts);
    return this.savedProductsStream.asObservable();
  }

  isCacheExpired(cacheEpoch: string): boolean {
    const currentTime = new Date().getTime();
    const storedTime = parseInt(cacheEpoch);
    const _5MinsInMillieSeconds = 300000;
    return storedTime + _5MinsInMillieSeconds < currentTime;
  }

  updateCache(products: Product[]) {
    this.localDB.save("products", JSON.stringify(products));
    // Cache Update Time
    const currentTime = new Date().getTime();
    this.localDB.save("cache_epoch", JSON.stringify(currentTime));
  }

  async requestCacheUpdate(): Promise<void> {
    console.log("Caache Update Requested");
    try {
      const request = this.httpClient.get<Product[]>(this.PRODUCTS_API);
      const prodcuts = await firstValueFrom(request);
      this.updateCache(prodcuts);
    } catch (error) {
      console.log("Error Updating Cache");
      console.log(error);
    }
  }

  getCart(): CartItem[] {
    const savedCart = this.localDB.get("cart") as string;
    if(savedCart == null)
      return [];
    return JSON.parse(savedCart);
  }

  getCartItemById(id: number) : CartItem | undefined{
    return this.getCart().find(currentCart => currentCart.product.id === id);
  }

  updateQuantity(itemToUpdate : CartItem, quantity: number){

      const itemInCart = this.getCartItemById(itemToUpdate.product.id);
      itemInCart!.quantity = quantity;

      const cart = this.getCart();
      this.localDB.save("cart", JSON.stringify(cart))
  }

  addToCart(newItem: CartItem) {
    let cart = this.getCart();
    const itemInCart = this.getCartItemById(newItem.product.id);

    if(itemInCart){
      itemInCart.quantity += newItem.quantity;
      cart = cart.filter(currentCart => currentCart.product.id !== itemInCart.product.id);
      cart.push(itemInCart);
    }else{
      cart.push(newItem);
    }

    this.localDB.save("cart", JSON.stringify(cart))
  }

  cleartCart() {
    this.localDB.save("cart", "[]")
    return [];
  }

  removeItemFromCart(cartItem :CartItem){
    let cart = this.getCart();
    cart.filter(it => it.product.id !== cartItem.product.id )
    this.localDB.save("cart", JSON.stringify(cart))
  }
}
