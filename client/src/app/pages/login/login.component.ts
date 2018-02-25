import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginInfo } from '../../interfaces/login-info';
import { AuthorizeApiService } from '../../services/authorize-api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: LoginInfo = {
    l_username: '',
    l_password: ''
  };

  errorMessage: string = '';
  loginError: string;

  constructor( private authThang: AuthorizeApiService,
               private routerThang: Router) { }

  ngOnInit() {
  }

  loginSubmit(){
    this.authThang.postLogin(this.loginUser)
      .subscribe(
        (userInfo) => {
          this.routerThang.navigate(['']);
        },
        (errInfo) => {
          if(errInfo.status === 401) {
            this.loginError = 'Bad credentials';
          }
          else {
            this.loginError = 'Something went wrong. Try again later';
          }
        }
      );
  }
}
