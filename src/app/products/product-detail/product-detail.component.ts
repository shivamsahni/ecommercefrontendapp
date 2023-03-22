import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartItem } from 'src/app/_models/cartItem';
import { Product } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';
import { CartService } from 'src/app/_services/cart.service';
import { ProductserviceService } from 'src/app/_services/productservice.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productItem: Product= {
    name: "",
    id: "",
    price: 0,
    imageURL: "",
    description:"",
    isDiscounted: false,
    isFeatured: false,
    category:"",
  };

  productId: string = "";
  category: string = "";

  constructor(private route: ActivatedRoute,
    private productService: ProductserviceService,
    public accountService: AccountService,
    private cartService: CartService,
    private router : Router) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      (queryString: Params) =>{
        console.log('queryString'+queryString);
        console.log(queryString);
        if(queryString['id']){
          this.productId = queryString['id'];
        }
      }
    );

    this.route.queryParams.subscribe(params=>{
      this.category = params.category;
      console.log('category:'+this.category);
    })

    if(this.productId!==""){
      this.productService.getProductById(this.productId, this.category).subscribe((p:Product)=>{
        
        if(p){
          this.productItem =p;
        }
        
      });
    }


  }

  addToCart(){
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
      this.router.navigateByUrl('/cart');

    }
  }

}
