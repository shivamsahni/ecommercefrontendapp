import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/_models/cartItem';
import { Product } from 'src/app/_models/product';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: CartItem ={
    name: "",
    id: "",
    price: 0,
    imageURL: "",
    quantity:0,
    calculatedPrice:0
  };

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.cartItem!.id);
  }

  updateQuantity(){
    this.cartService.addToCart(this.cartItem);
  }

}
