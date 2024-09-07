import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {

  private readonly _CartService = inject(CartService);
  userCartSub!:Subscription;
  removeItemSub!:Subscription;
  ubdateItemSub!:Subscription;
  clearCartSub!:Subscription;
  cartDetails:ICart  = {} as ICart
  isLoading:boolean = false;

  ngOnInit(): void {
    this.userCartSub = this.userCartSub = this._CartService.getUserCart().subscribe({
      next:(res)=>{
        this.cartDetails = res.data;
      }
    })
  }

  removeItem(id:string):void{
    this.isLoading = true;
    this.removeItemSub = this._CartService.removeSpecificProduct(id).subscribe({
      next:(res)=>{
        this.isLoading = false
        this.cartDetails = res.data;
        this._CartService.cartNum.next(res.numOfCartItems)
      }
    })
  }

  updateCount(id:string, count:number):void{
    if(count > 0){
      this.isLoading = true;
      this.ubdateItemSub = this._CartService.productQuantity(id, count).subscribe({
        next:(res)=>{
          this.isLoading = false
          this.cartDetails = res.data;
        }
      })
    }
  }

  clearProducts():void{
    this.clearCartSub = this._CartService.clearCart().subscribe({
      next:(res)=>{
        if(res.message === 'success'){
          this.cartDetails = {} as ICart;
          this._CartService.cartNum.next(0);
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.userCartSub?.unsubscribe();
    this.removeItemSub?.unsubscribe();
    this.clearCartSub?.unsubscribe();
  }
}
