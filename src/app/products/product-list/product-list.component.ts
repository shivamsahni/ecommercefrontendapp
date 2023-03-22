import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductserviceService } from 'src/app/_services/productservice.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(public productService: ProductserviceService,
              public route: ActivatedRoute
              ){}

  ngOnInit(): void {
    this.route.queryParams//.filter((params:any) => params.category)
    .subscribe(
      (queryString: Params) =>{

        if(queryString['category']){
          let category = queryString['category'];
          this.productService.searchByCategory2(category);
        }
        else if(queryString['searchtext']){
          this.productService.searchByText(queryString['searchtext']);
        }
        else{
          console.log('going for all products');
          this.productService.getAllProducts();
        }

      }
    )
  }

}
