import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {
    "email": "",
    "password": ""
  };

  constructor(public userService : UserService, private router: Router) { }

  ngOnInit() {
  }
  
  toLogin(user) {
    console.log(this.user);
    this.userService.login({"email": this.user.email, "password": this.user.password})
    .subscribe((res) => {
      console.log(res);
      this.userService.toHomePage(res)
      //this.router.navigate(['home']);  
    });
  }
  
  toRegister() {
    this.router.navigate([`register`]);
  }

}
