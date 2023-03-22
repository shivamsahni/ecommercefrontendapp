import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CartItem } from 'src/app/_models/cartItem';
import { Product } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';
import { CartService } from 'src/app/_services/cart.service';
import { ProductserviceService } from 'src/app/_services/productservice.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product = {
    name: "",
    id: "",
    price: 0,
    imageURL: "",
    description:"",
    isDiscounted: false,
    isFeatured: false,
    category:"",
  };

  constructor(private cartService: CartService,
    private productService: ProductserviceService,
    private router: Router,
    public accountService: AccountService
    ) { }

  ngOnInit(): void {
  }

  handleAddToCart(){

    if(this.accountService.isLoggedIn()){

      let item: CartItem;
      item = {
        name: this.productItem.name,
        id: this.productItem.id,
        price: this.productItem.price,
        quantity: 1,
        imageURL: this.productItem.imageURL,
        calculatedPrice: this.productItem.price
      }

      let alreadyAdded = this.cartService.getCartItem(this.productItem.id);

      if(alreadyAdded!==undefined){
        item.quantity = (alreadyAdded.quantity+1);
        if(item.quantity>10)
          item.quantity = 10;
        item.calculatedPrice = item.quantity*item.price;
      }

      this.cartService.addToCart(item); 
    }
  
  }

  goToProductDetailPage(id: string, category: string){
    console.log('go to product detail page: '+category);
    this.productService.Product$ = this.productService.getProductById(id, category);
    this.router.navigateByUrl("/products/"+id+"?category="+category);
  }

}
