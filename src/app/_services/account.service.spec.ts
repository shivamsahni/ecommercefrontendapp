import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { Type } from '@angular/core';

describe('AccountService', () => {
  let account: AccountService,
  httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule],
        providers:[AccountService]
    });
    httpTestingController = TestBed.inject(HttpTestingController)
    account = TestBed.inject(AccountService);

  });

  afterEach(()=>{
      httpTestingController.verify();
  })

  it('should be created', () => {
    expect(account).toBeTruthy();
  });

  it('account Service should return user on login', (done)=>{

    const input = {'username': 'shivam', 'password' : 'shivam'};

      account.login(input).subscribe((u)=>{
          expect(u).toEqual(input);
          expect(u?.username).toEqual('shivam');
          done()
      });

      const req = httpTestingController.expectOne(`/api/users?username=shivam&password=shivam`);
      req.flush(new Array(input));
  })

  it('account Service should return empty user on login when user not present', (done)=>{

    const input = {'username': 'jarvis', 'password': 'tonyboss'}

    account.login(input).subscribe((u)=>{
        expect(u).toEqual({});
        expect(u?.username).toEqual(undefined);
        done()
    });

    const req = httpTestingController.expectOne(`/api/users?username=jarvis&password=tonyboss`);
    req.flush(new Array({}));
})


  xit('should set the current user', ()=>{
    let inputUser: User = {
      username: "admin"
    };

    account.setCurrentUser(inputUser);

    account.currentUser$.subscribe(u =>{
      expect(u).toEqual(inputUser);
    })

  })


});
