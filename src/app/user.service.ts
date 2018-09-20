import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user;
  email;
  password;
  returnUrl: string = "charts";
  
  url: string = "http://mean-stack-charlie-2018-warren-phortonssf.c9users.io:8080/api/AppUsers?access_token=1209600000";
  

  constructor(private http: HttpClient, private router: Router) { }
  
  
  login(user){
    return this.http.post(this.url, user);
  }
  
  register(user){
    return this.http.post(this.url, user);
  }
  
  toHomePage(resData){
    //Save data from our succesfull login in sessionStorage
    window.sessionStorage.setItem( "token", resData.token);
    window.sessionStorage.setItem( "userId", resData.userId);
     this.router.navigate([this.returnUrl]);   
  }
}
