import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  msg:boolean = false;
  msgError:string = ''
  isLoading:boolean = false;
  registerSub!:Subscription

  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern( /^\w{6,}$/ )]],
    rePassword: [null],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, {validators: this.confirmPassword})

  confirmPassword(fg:AbstractControl){
    if(fg.get('password')?.value === fg.get('rePassword')?.value)
    {
      return null
    }
    else
    {
      return {missmatch:true}
    }
  }

  submitRegister():void
  {
    if(this.registerForm.valid){
      this.isLoading = true;
      this.registerSub = this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          if(res.message == 'success'){
            this.msg = true
            setTimeout(() => {
              this._Router.navigate(['/login'])
            }, 1000);
          }
          this.isLoading = false
        },
        error:(err)=>{
          this.msgError = err.error.message
          this.isLoading = false
        }
      })
    }
    else{
      this.registerForm.setErrors({missmatch:true})
      this.registerForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe()
  }

}
