import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any= {};
  currentUser$ : Observable<User> | undefined;

  constructor(private http: HttpClient, 
              private accountService: AccountService,
              private toastr: ToastrService,
              private router: Router,
              public translate: TranslateService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    if(this.model?.username===undefined && this.model?.password===undefined)
      this.toastr.error(this.translate.instant('toastrmessages.usernamepasswordrequired'));
    else if(this.model?.username===undefined){
      this.toastr.error(this.translate.instant('toastrmessages.usernamerequired'));
    }
    else if(this.model?.password===undefined){
      this.toastr.error(this.translate.instant('toastrmessages.passwordrequired'));
    }
    else{
      this.accountService.login(this.model).subscribe((response:any)=>{
        if(response){
          this.toastr.success(this.translate.instant('toastrmessages.loginsuccess'))
          this.router.navigateByUrl('/');
        }
        else{
          this.toastr.error(this.translate.instant('toastrmessages.incorrect'));
        }
    });
  }
  }

}


