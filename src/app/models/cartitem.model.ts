import { Product } from './product.model';

export interface CartItem {
    products: Product;
    quantity: number;
}