import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, SearchPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  productsSub!:Subscription
  cartSub!:Subscription
  productsList:IProduct[] = [];
  text:string = "";

  ngOnInit(): void {
      this.productsSub = this._ProductsService.getAllProducts().subscribe({
        next:(res)=>{
          this.productsList = res.data
        }
    })
  }

  addProduct(id:string):void{
    this.cartSub = this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message, 'Success');
        this._CartService.cartNum.next(res.numOfCartItems);
      }
    })
  }

  ngOnDestroy(): void {
      this.cartSub?.unsubscribe();
      this.productsSub?.unsubscribe();
  }

}
