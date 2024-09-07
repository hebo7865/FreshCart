import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  loginInterval:any 
  loginSubscribtion!:Subscription

  isLoading:boolean = false
  msgError:string = "";

  loginForm:FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
  })


  submitLogin():void{
    this.isLoading = true
    this.loginSubscribtion = this._AuthService.setLoginFrom(this.loginForm.value).subscribe({
      next:(res)=>{
        this.isLoading = false
        if(res.message === 'success'){
          this.loginInterval = setInterval(()=>{
            localStorage.setItem('userToken', res.token)
            this._AuthService.saveUserData()
            this._Router.navigate(['/home'])
          }, 1000)
        }
      },
      error:(err)=>{
        this.isLoading = false
        this.msgError = err.error.message
      }
    })
  }


  ngOnDestroy(): void {
    clearInterval(this.loginInterval);
    this.loginSubscribtion?.unsubscribe();
  }
}
