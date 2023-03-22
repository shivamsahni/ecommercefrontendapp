import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { DataViewModule } from "primeng/dataview";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { TooltipModule } from "primeng/tooltip";
import { of } from "rxjs";
import { AppRoutingModule } from "src/app/app-routing.module";
import { AppModule, HttpLoaderFactory } from "src/app/app.module";
import { ProductserviceService } from "src/app/_services/productservice.service";
import { ProductListComponent } from "./product-list.component"


describe('ProductListComponent', ()=>{

    let productlist: ProductListComponent;
    let httpTestingController: HttpTestingController;
    let fixture: ComponentFixture<ProductListComponent>;
    let el: DebugElement;
    let productService: ProductserviceService;

    beforeEach(waitForAsync(()=>{

        //let activatedRoute = jasmine.createSpyObj('ActivatedRoute', [], ["queryParams"])
        const productServiceSpy = jasmine.createSpyObj('ProductserviceService', ["searchByCategory2", "search2"]);

        TestBed.configureTestingModule({
            providers:[
                {provide: ActivatedRoute, useValue: {queryParams: of({'': ''})}},
                {provide: ProductserviceService, useValue: productServiceSpy},
                ProductListComponent
            ],
            imports:[
                AppModule,
                HttpClientTestingModule
            ]
        }).compileComponents()
            .then(()=>{
                httpTestingController = TestBed.inject(HttpTestingController)
                fixture = TestBed.createComponent(ProductListComponent)
                productlist = fixture.componentInstance;
                el = fixture.debugElement;
                //productService = TestBed.get(productServiceSpy);
            })
    }))

    it('should create product-list component', ()=>{

        expect(productlist).toBeTruthy();

    })







})