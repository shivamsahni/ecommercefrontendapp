import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../_models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  private SERVER_URL = environment.backendURL;
 
  constructor(private http: HttpClient) {}

  private selectedProduct = new BehaviorSubject<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    imageURL: "",
    isFeatured: false,
    isDiscounted: false,
    category: ""
  });

  private selectedProducts = new BehaviorSubject<Product[]>([]);

  Product$ = this.selectedProduct.asObservable();
  Products$ = this.selectedProducts.asObservable();

  isProductEmpty$: Observable<boolean> | undefined;

  isProductsEmpty$: Observable<boolean> | undefined;

  search(q: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.SERVER_URL + '/products?name_like=' + q
    );
  }

  searchByText(q: string){
    this.Products$ =  this.http.get<Product[]>(
      this.SERVER_URL + '/products?searchtext=' + q
    );
  }  

  searchByCategory(category: string):Observable<Product[]>{
    return this.http.get<Product[]>(
      this.SERVER_URL+'/products?category_like=' + category
    )
  }

  searchByCategory2(category: string){
    console.log('inside search by category 2:'+category);
    console.log(this.SERVER_URL);
    this.Products$ =  this.http.get<Product[]>(
      this.SERVER_URL+'/products?category=' + category
    )
  }

  updateSelectedProduct(product: Product) {
    this.selectedProduct.next(product);
  }

  updateSelectedProducts(products: Product[]) {
    this.selectedProducts.next(products);
  }

  getProductById(id: string, category: string){
    return this.http.get<Product>(
      this.SERVER_URL + '/products/' + id+'?category_like='+category
    )
  }

  getAllProducts(){
    this.Products$ =  this.http.get<Product[]>(
      this.SERVER_URL+'/products'
    )
  }

  getFeaturedProducts(){
    return this.http.get<Product[]>(
      this.SERVER_URL+'/products/getFeaturedProducts'
    );
  }

}
