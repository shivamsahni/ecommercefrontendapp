import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { CartItem } from '../_models/cartItem';
import { Product } from '../_models/product';
import { AccountService } from '../_services/account.service';
import { CartService } from '../_services/cart.service';
import { ProductserviceService } from '../_services/productservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 4000, noPause: true, showIndicators: true } }
  ],
})
export class HomeComponent implements OnInit {

  responsiveOptions: any = [];

  products: Product[] = [];
  // [
  //   {
  //     "id": "6",
  //     "name": "Iphone 12",
  //     "description": "Iphone 12 is here to rock again",
  //     "price": 120000,
  //     "isFeatured": true,
  //     "isDiscounted": false,
  //     "category": "touch mobile",
  //     "imageURL": "../../../assets/components/images/productimages/iphonemobile.jfif"
  //   }, {
  //     "id": "14",
  //     "name": "Nike Shoes",
  //     "description": "Nike black with color shoes",
  //     "price": 6000,
  //     "isFeatured": true,
  //     "isDiscounted": false,
  //     "category": "shoes",
  //     "imageURL": "../../../assets/components/images/productimages/nikeshoes.jfif"
  //   }, {
  //     "id": "20",
  //     "name": "Samsung S20",
  //     "description": "Samsung punch hole camera s20",
  //     "price": 80000,
  //     "isFeatured": true,
  //     "isDiscounted": false,
  //     "category": "touch mobile",
  //     "imageURL": "../../../assets/components/images/productimages/samsungmobile.jfif"
  //   }, {
  //     "id": "23",
  //     "name": "Superdry Flip Flops",
  //     "description": "Parrot color superdry flip flops",
  //     "price": 3000,
  //     "isFeatured": true,
  //     "isDiscounted": false,
  //     "category": "flip flops",
  //     "imageURL": "../../../assets/components/images/productimages/superdryflipflops.jfif"
  //   }, {
  //     "id": "12",
  //     "name": "Maggi",
  //     "description": "2 minute tasty maggi noodles",
  //     "price": 12,
  //     "isFeatured": true,
  //     "isDiscounted": false,
  //     "category": "pasta and noodles",
  //     "imageURL": "../../../assets/components/images/productimages/magginoddle.jfif"
  //   },
  // ];

  constructor(public router: Router,
              public cartService: CartService,
              public productService: ProductserviceService,
              public accountService: AccountService) { 

    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  }

  handleAddToCart(id: string, category: string){

    if(this.accountService.isLoggedIn()){

      let productItem : Product;//= this.productService.getProductById(id);
      if(id!==""){
        this.productService.getProductById(id, category).subscribe((p:Product)=>{
          
          if(p){
            productItem = p;
            let item: CartItem;
            item = {
              name: productItem.name,
              id: productItem.id,
              price: productItem.price,
              quantity: 1,
              imageURL: productItem.imageURL,
              calculatedPrice: productItem.price
            }
      
            let alreadyAdded = this.cartService.getCartItem(productItem.id);
      
            if(alreadyAdded!==undefined){
              item.quantity = (alreadyAdded.quantity+1);
              if(item.quantity>10)
                item.quantity = 10;
              item.calculatedPrice = item.quantity*item.price;
            }
      
            this.cartService.addToCart(item);
          } 
        });
      }
    }
  }

  goToProductDetailPage(id: string, category: string){
    this.productService.Product$ = this.productService.getProductById(id, category);
    this.router.navigateByUrl("/products/"+id+"?category="+category);
  }

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe((products: Product[])=>{
      this.products = products;
    });
  }

}
