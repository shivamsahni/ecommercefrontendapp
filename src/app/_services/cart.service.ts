import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartComponent } from '../order/cart/cart.component';
import { CartItem } from '../_models/cartItem';
import { Product } from '../_models/product';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private selectedCartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.selectedCartItems.asObservable();
  private selectedTotal = new BehaviorSubject<number>(0);
  cartTotal$ = this.selectedTotal.asObservable();

  constructor() { }

  addToCart(item: CartItem) {

    let cartItems: CartItem[] = this.selectedCartItems.getValue();
    let total: number = this.selectedTotal.getValue();

    let productExists = false

    for (let it of cartItems) {
      if (it.id === item.id) {
        it.quantity = item.quantity
        total -= it.calculatedPrice
        it.calculatedPrice = ((it.price) * (it.quantity))
        total += it.calculatedPrice
        productExists = true

        break;
      }
    }

    if (!productExists) {
      let newItem: CartItem = {
        id: item.id,
        name: item.name,
        quantity: 1,
        price: item.price,
        imageURL: item.imageURL,
        calculatedPrice: item.price * item.quantity
      };
      total += newItem.calculatedPrice
      cartItems.push(newItem);
    }

    this.selectedTotal.next(total);
    this.selectedCartItems.next(cartItems);
  }

  removeFromCart(id: string) {

    let cartItems: CartItem[] = this.selectedCartItems.getValue();
    let total: number = this.selectedTotal.getValue();

    cartItems.forEach((item, index) => {
      if (item.id === id) {
        total-=item.calculatedPrice
        cartItems.splice(index, 1);
      }
    });

    this.selectedTotal.next(total);
    this.selectedCartItems.next(cartItems);
  }

  getCartItem(id: string): any {
    let cartItems: CartItem[] = this.selectedCartItems.getValue();

    let productExists = false

    for (let it of cartItems) {
      if (it.id === id) {
        return it;
      }
    }

    return undefined;
  }

  resetCart(){
    this.selectedCartItems.next([]);
    this.selectedTotal.next(0);
  }


}
