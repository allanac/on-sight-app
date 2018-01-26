import { Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/do'

import {environment} from '../../environments/environment'

class SignUp {
  s_username: string
  s_password: string
}

class Login {
  l_username: string
  l_password: string
}
@Injectable()
export class AuthorizeApiService {

  baseUrl: string = environment.apiUrl

  loginStatusSubject = new BehaviorSubject <any> ({ isLoggedIn: false})
  loginStatusNotifier = this.loginStatusSubject.asObservable()

  constructor(private http: HttpClient) { }

  // ----- POST/API/signup ----- //
  postSignup(userInfo:SignUp){
    return (this.http.post(this.baseUrl + '/api/signup', userInfo, {withCredentials:true})
      .do((userInfo) => {
        this.loginStatusSubject.next({
          isLogginIn: true,
          userInfo: userInfo
        })
      })
    )
  }

  //  ----- GET/api/checklogin
  getLoginStatus(){
    return (this.http.get(this.baseUrl+ '/api/checklogin', {withCredentials: true})
      .do((loggedInInfo) => {
        this.loginStatusSubject.next(loggedInInfo)
      })
    )
  }
  // -----post/api/login
  postLogin(loginCredentials: Login){
    return (this.http.post(this.baseUrl + '/api/login', loginCredentials, {withCredentials:true})
      .do((userInfo) => {
        this.loginStatusSubject.next({isLoggedIn:true, userInfo:userInfo})
      })
    )
  }

  // delete/api/logout

}
