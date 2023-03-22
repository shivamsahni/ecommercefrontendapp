import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { TranslateService } from  '@ngx-translate/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShoppersPoint';

  constructor(private http: HttpClient, private accountService: AccountService,public translate:  TranslateService, public authService: MsalService){
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(){
    console.log('inside app component ng on init: ');
    console.log(this.authService.instance.getAllAccounts()[0].username);
    if(this.authService.instance.getAllAccounts().length>0){
      let inputUser: User = {
        username: this.authService.instance.getAllAccounts()[0].username
      };
      this.accountService.setCurrentUser(inputUser);
    }

  }

  setCurrentUser(){
    const u:any = localStorage.getItem('user')?.toString();
    let user: User ={'username': 'dummy'};
    if(u===undefined){
      user = {'username': ""};
    }
    else
    { user = {'username': u};}
    
    this.accountService.setCurrentUser(user);
  }

}
