import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Observable, pipe, Subject } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ProductserviceService } from 'src/app/_services/productservice.service';
import { map, filter, takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/_services/cart.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { keyframes } from '@angular/animations';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

    searchProduct: string = "";
    items: MenuItem[] = [];
    currentUser$: Observable<User> | undefined;
    loggedIn: boolean = false;
    cartSize: string="0";

    title = 'msal-angular-tutorial';
    loginDisplay = false;
    private readonly _destroying$ = new Subject<void>();

    constructor(public accountService: AccountService,
        private router: Router,
        private toastr: ToastrService,
        private productService: ProductserviceService,
        public cartService: CartService,
        private translate: TranslateService,
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, private broadcastService: MsalBroadcastService, public authService: MsalService) {
            translate.setDefaultLang('en');
    }

    ngOnInit() {
        console.log('is loggined: '+this.authService.instance.getAllAccounts().length);
        console.log(this.authService.instance.getAllAccounts());
        this.broadcastService.inProgress$
        .pipe(
          filter((status: InteractionStatus) => status === InteractionStatus.None),
          takeUntil(this._destroying$)
        )
        .subscribe(() => {
          this.setLoginDisplay();
        })

        this.currentUser$ = this.accountService.currentUser$;

        this.currentUser$.subscribe(pipe((u: any) => {
            if (u?.username !== undefined)
                this.loggedIn = true;
        }))

        this.items = 
        [
            {
                label: 'Category',
                icon: 'pi pi-fw pi-sitemap',
                items:[
                    {
                        label: 'Men',
                        icon: 'pi pi-fw pi-shield',
                        items: [
                            {
                                label: 'Topwear',
                                icon: 'pi pi-fw pi-star-o',
                                items: [
                                    {
                                        label: 'T-Shirt',
                                        icon: 'pi pi-fw pi-shield',
                                        routerLink: '/products',
                                        queryParams: {category:'men_topwear_tshirt'}
                                    },
                                    {
                                        label: 'Shirt',
                                        icon: 'pi pi-fw pi-shield',
                                        routerLink: '/products',
                                        queryParams: {category:'men_topwear_shirt'}
                                    }
                                ]
                            },
                            {
                                label: 'Bottomwear',
                                icon: 'pi pi-fw pi-star-o',
                                items: [
                                    {
                                        label: 'Trousers',
                                        icon: 'pi pi-fw pi-shield',
                                        routerLink: '/products',
                                        queryParams: {category:'men_bottomwear_trousers'}
                                    },
                                    {
                                        label: 'Jeans',
                                        icon: 'pi pi-fw pi-shield',
                                        routerLink: '/products',
                                        queryParams: {category:'men_bottomwear_jeans'}
                                    },
                                    {
                                        label: 'Joggers',
                                        icon: 'pi pi-fw pi-shield',
                                        routerLink: '/products',
                                        queryParams: {category:'men_bottomwear_joggers'}
                                    },
                                    {
                                        label: 'Shorts',
                                        icon: 'pi pi-fw pi-shield',
                                        routerLink: '/products',
                                        queryParams: {category:'men_bottomwear_shorts'}
                                    },
 
                                ],
                            }]
                    },                                   
                    {
                        label: 'Women',
                        icon: 'pi pi-fw pi-shield',
                        items: [
                            {
                                label: 'Topwear',
                                icon: 'pi pi-fw pi-star-o',
                                items: [
                                    {
                                        label: 'Tops',
                                        icon: 'pi pi-fw pi-shield',
                                        routerLink: '/products',
                                        queryParams: {category:'women_topwear_tops'}
                                    },
                                    {
                                        label: 'Shirt',
                                        icon: 'pi pi-fw pi-shield',
                                        routerLink: '/products',
                                        queryParams: {category:'women_topwear_shirt'}
                                    }
                                ]
                            },
                            {
                                label: 'Bottomwear',
                                icon: 'pi pi-fw pi-heart',
                                items: [
                                    {
                                        label: 'Trousers',
                                        icon: 'pi pi-fw pi-shield',
                                        routerLink: '/products',
                                        queryParams: {category:'women_bottomwear_trousers'}
                                    },
                                    {
                                        label: 'Jeans',
                                        icon: 'pi pi-fw pi-shield',
                                        routerLink: '/products',
                                        queryParams: {category:'women_bottomwear_jeans'}
                                    },
                                    {
                                        label: 'Trackpants',
                                        icon: 'pi pi-fw pi-shield',
                                        routerLink: '/products',
                                        queryParams: {category:'women_bottomwear_trackpants'}
                                    },
                                    {
                                        label: 'Shorts',
                                        icon: 'pi pi-fw pi-shield',
                                        routerLink: '/products',
                                        queryParams: {category:'women_bottomwear_shorts'}
                                    }
                                ]
                            },
                            {
                                label: 'Dresses',
                                icon: 'pi pi-fw pi-heart',
                                items: [
                                    {
                                        label: 'Dresses',
                                        icon: 'pi pi-fw pi-globe',
                                        routerLink: '/products',
                                        queryParams: {category:'women_dress'}
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
        {
            label: 'Language',
            icon: 'pi pi-fw pi-book',
            items: [
                {
                    label: 'English',
                    icon: 'pi pi-fw pi-id-card',
                    command: ()=>{
                        this.useLanguage('en');
                    }
                },
                {
                    label: 'Hindi',
                    icon: 'pi pi-fw pi-id-card',
                    command: ()=>{
                        this.useLanguage('hi');
                    }
                }
            ]
        },
        {
            label: 'All Products',
            icon: 'pi pi-fw pi-star-o',
            routerLink: '/products'
        }
    ]        

        this.translate.onLangChange.subscribe(
            (translate: LangChangeEvent) => {

               this.items= [
                {
                    label: translate.translations.header['category'],
                    icon: 'pi pi-fw pi-sitemap',
                    items:[
                        {
                            label: translate.translations.header['men'],
                            icon: 'pi pi-fw pi-shield',
                            items: [
                                {
                                    label: translate.translations.header['topwear'],
                                    icon: 'pi pi-fw pi-star-o',
                                    items: [
                                        {
                                            label: translate.translations.header['tshirt'],
                                            icon: 'pi pi-fw pi-shield',
                                            routerLink: '/products',
                                            queryParams: {category:'men_topwear_tshirt'}
                                        },
                                        {
                                            label: translate.translations.header['shirt'],
                                            icon: 'pi pi-fw pi-shield',
                                            routerLink: '/products',
                                            queryParams: {category:'men_topwear_shirt'}
                                        }
                                    ]
                                },
                                {
                                    label: translate.translations.header['bottomwear'],
                                    icon: 'pi pi-fw pi-star-o',
                                    items: [
                                        {
                                            label: translate.translations.header['trousers'],
                                            icon: 'pi pi-fw pi-shield',
                                            routerLink: '/products',
                                            queryParams: {category:'men_bottomwear_trousers'}
                                        },
                                        {
                                            label: translate.translations.header['jeans'],
                                            icon: 'pi pi-fw pi-shield',
                                            routerLink: '/products',
                                            queryParams: {category:'men_bottomwear_jeans'}
                                        },
                                        {
                                            label: translate.translations.header['joggers'],
                                            icon: 'pi pi-fw pi-shield',
                                            routerLink: '/products',
                                            queryParams: {category:'men_bottomwear_joggers'}
                                        },
                                        {
                                            label: translate.translations.header['shorts'],
                                            icon: 'pi pi-fw pi-shield',
                                            routerLink: '/products',
                                            queryParams: {category:'men_bottomwear_shorts'}
                                        },
     
                                    ],
                                }]
                        },                                   
                        {
                            label: translate.translations.header['women'],
                            icon: 'pi pi-fw pi-shield',
                            items: [
                                {
                                    label: translate.translations.header['topwear'],
                                    icon: 'pi pi-fw pi-star-o',
                                    items: [
                                        {
                                            label: translate.translations.header['tops'],
                                            icon: 'pi pi-fw pi-shield',
                                            routerLink: '/products',
                                            queryParams: {category:'women_topwear_tops'}
                                        },
                                        {
                                            label: translate.translations.header['shirt'],
                                            icon: 'pi pi-fw pi-shield',
                                            routerLink: '/products',
                                            queryParams: {category:'women_topwear_shirt'}
                                        }
                                    ]
                                },
                                {
                                    label: translate.translations.header['bottomwear'],
                                    icon: 'pi pi-fw pi-heart',
                                    items: [
                                        {
                                            label: translate.translations.header['trousers'],
                                            icon: 'pi pi-fw pi-shield',
                                            routerLink: '/products',
                                            queryParams: {category:'women_bottomwear_trousers'}
                                        },
                                        {
                                            label: translate.translations.header['jeans'],
                                            icon: 'pi pi-fw pi-shield',
                                            routerLink: '/products',
                                            queryParams: {category:'women_bottomwear_jeans'}
                                        },
                                        {
                                            label: translate.translations.header['trackpants'],
                                            icon: 'pi pi-fw pi-shield',
                                            routerLink: '/products',
                                            queryParams: {category:'women_bottomwear_trackpants'}
                                        },
                                        {
                                            label: translate.translations.header['shorts'],
                                            icon: 'pi pi-fw pi-shield',
                                            routerLink: '/products',
                                            queryParams: {category:'women_bottomwear_shorts'}
                                        }
                                    ]
                                },
                                {
                                    label: translate.translations.header['dresses'],
                                    icon: 'pi pi-fw pi-heart',
                                    items: [
                                        {
                                            label: translate.translations.header['dresses'],
                                            icon: 'pi pi-fw pi-globe',
                                            routerLink: '/products',
                                            queryParams: {category:'women_dress'}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            {
                label: translate.translations.header['language'],
                icon: 'pi pi-fw pi-book',
                items: [
                    {
                        label: translate.translations.header['language1'],
                        icon: 'pi pi-fw pi-id-card',
                        command: ()=>{
                            this.useLanguage('en');
                        }
                    },
                    {
                        label: translate.translations.header['language2'],
                        icon: 'pi pi-fw pi-id-card',
                        command: ()=>{
                            this.useLanguage('hi');
                        }
                    }
                ]
            },
            {
                label: translate.translations.header['all_products'],
                icon: 'pi pi-fw pi-star-o',
                routerLink: '/products'
            }]
            });
    }

    // logout() {
    //     this.accountService.logout();
    //     this.cartService.resetCart();
    //     this.loggedIn = false;
    // }

    searchIt() {

        if(this.searchProduct.length===0)
            this.router.navigateByUrl('/products');
        else
            this.router.navigate(['/products'], {queryParams:{searchtext: this.searchProduct}})

        this.searchProduct = "";
    }    

    useLanguage(lang: string): void{
        this.translate.use(lang);
    }

    login() {
        console.log('inside login method');
        console.log(this.msalGuardConfig.authRequest);
        if (this.msalGuardConfig.authRequest){
          this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest).subscribe(result=>{
            console.log(result);
            console.log('inside subscribe complete');
          });
        } else {
          this.authService.loginRedirect().subscribe(result=>{
            console.log(result);
            console.log('inside login redirect');
          });
        }
      }
    
      logout() { 
        this.accountService.logout();
        this.cartService.resetCart();
        this.loggedIn = false;
        this.authService.logoutRedirect({
          postLogoutRedirectUri: 'http://localhost:4200'
        });
      }
    
      setLoginDisplay() {
        this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
      }
    
      ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
      }

}

