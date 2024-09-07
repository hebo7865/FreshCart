import { IProduct } from './../../core/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  wishlist:IProduct[] = []; 

  ngOnInit(): void {
      this._WishlistService.getUserWishlist().subscribe({
        next:(res)=>{
          this.wishlist = res.data          
        }
      })
  }

  addProductToCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message, 'Success')
        this._CartService.cartNum.next(res.numOfCartItems)
      }
    })
  }
}
