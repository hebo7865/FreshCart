import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnDestroy {

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  step:Number = 1;

  isLoading: boolean = false;

  verifyEmailSub!:Subscription;
  verifyCodeSub!:Subscription;
  resetPassSub!:Subscription;
  

  verifyEmail:FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  });

  verifyCode:FormGroup = this._FormBuilder.group({
    resetCode:[null, [Validators.required, Validators.pattern(/^\w{6}$/)]]
  })

  resetPassword:FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
  })


  submitVerifyEmail():void{
    let emailValue = this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailValue)
    this.isLoading = true
    this.verifyEmailSub = this._AuthService.setVerifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        this.isLoading = false
        console.log(res);
        if(res.statusMsg === 'success'){
          this.step = 2
        }
      },
      error:(err)=>{
        this.isLoading = false
        console.log(err);
      }
    })
  }


  submitVerifyCode():void{
    this.isLoading = true;
    this.verifyCodeSub = this._AuthService.setVerifyCode(this.verifyCode.value).subscribe({
      next:(res)=>{
        this.isLoading = false
        console.log(res);
        if(res.status === 'Success'){
          this.step = 3;
        }
      },
      error:(err)=>{
        this.isLoading = false
        console.log(err);
      }
    })
  }

  submitResetPass():void{
    this.isLoading = true
    this.resetPassSub = this._AuthService.resetPass(this.resetPassword.value).subscribe({
      next:(res)=>{
        this.isLoading = false
        console.log(res);
        localStorage.setItem('userToken', res.token)
        this._AuthService.saveUserData();
        this._Router.navigate(['/home'])
      },
      error:(err)=>{
        this.isLoading = false
        console.log(err);
        
      }
    })
  }

  ngOnDestroy():void{
    this.verifyEmailSub?.unsubscribe();
    this.verifyCodeSub?.unsubscribe();
    this.resetPassSub?.unsubscribe();
  }

}
