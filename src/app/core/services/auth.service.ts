import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _Router = inject(Router)

  private readonly _HttpClient = inject(HttpClient)
  userData:any = null;

  setRegisterForm(data:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }

  setLoginFrom(data:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }

  saveUserData():void{
    if(localStorage.getItem('userToken'))
      this.userData = jwtDecode( localStorage.getItem('userToken')! )
      console.log(this.userData);
    }

  logout():void{
      localStorage.removeItem('userToken');
      this.userData = null;
      this._Router.navigate(['/login'])
  }


  setVerifyEmail(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }

  setVerifyCode(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }


  resetPass(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }
}
