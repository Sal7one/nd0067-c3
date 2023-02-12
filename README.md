

# Project3

### Routes:

- /products: product list
- /products/:id: product details
- /cart: view cart
- /comfirmation: after submit order

### Components:

# Common 
    AppComponent

    HeaderComponent
# Pages
    ProductListComponent

        ProductCardComponent

    ProductdetailsComponent

    CartComponent

    ConfirmComponent
### Models:

- CartItem 
```{
    product: Product;
    quantity: number;
}
```
- Product
```
Product {
    id: number;
    name: string;
    price: number;
    url: string;
    description: string;
}
```
- Order: 
```
Order {
    customerName: string;
    total: number;
}
```

### Services:

- local-db: Abstracation over the local storage api
- Repository: handles cache and remote sources (cart, prodcut CRUD operations) (depends on local-db)

## Install and run

1.  Run `npm install -g @angular/cli`
2.  Run `npm i`
3.  Run `ng serve`



Credits: 
Some of the css is made by me, Udacity team