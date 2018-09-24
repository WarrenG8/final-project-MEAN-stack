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
  
  
  url: string = "http://mean-stack-charlie-2018-warren-phortonssf.c9users.io:8080/api/AppUsers";
  

  constructor(private http: HttpClient, private router: Router) { }
  
  
  login(data){
    return this.http.post(this.url + '/login', data);
  }
  
  register(user){
    return this.http.post(this.url, user);
  }
  
  logout(){
    let token = sessionStorage.getItem("token");
    window.sessionStorage.clear();
    return this.http.post(this.url + '/logout?access_token=' + token, {});
  }
  
  toHomePage(resData){
    //Save data from our succesfull login in sessionStorage
    window.sessionStorage.setItem( "token", resData.token);
    window.sessionStorage.setItem( "userId", resData.userId);
     this.router.navigate([this.returnUrl]);   
  }
  
  getFavorites() {
    let token = window.sessionStorage.getItem("token");
    let id = window.sessionStorage.getItem("userId");
    return this.http.get(this.url + '/' + id + '/favorites?access_token='+ token, {});
  }
  
  addToFavorites(data){
    let token = window.sessionStorage.getItem("token");
    let id = window.sessionStorage.getItem("userId");
    return this.http.post(this.url + '/' + id + '/favorites?access_token='+ token, data); 
  }
  
}
