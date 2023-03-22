import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import {map} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService, private translate: TranslateService, private router: Router) {  
  }

  canActivate(): Observable<boolean> {
    
    return this.accountService.currentUser$.pipe(
      map(
        (u: any) => {
          if (u?.username == "") {
            this.toastr.error('Kindly Login First...');
            this.router.navigateByUrl('/login');
            return false;
          }

          else
            return true;
        }
      )
    );

  }
  
}
