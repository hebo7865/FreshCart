import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);
  activatedRouteSub!:Subscription;
  ordersSub!:Subscription;
  cartId:string | null = "";
  orders:FormGroup = this._FormBuilder.group({
    details: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    city: [null, [ Validators.required]],
  })

  submitOrders():void{

    this.ordersSub = this._OrdersService.checkOut(this.cartId, this.orders.value).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.status === 'success') {
          window.open(res.session.url, '_self');
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.activatedRouteSub = this._ActivatedRoute.paramMap.subscribe({
      next:(parms)=>{
        this.cartId = parms.get('id');
        console.log(this.cartId);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

ngOnDestroy(): void {
    this.activatedRouteSub?.unsubscribe();
    this.ordersSub?.unsubscribe();
}

}
