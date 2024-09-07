import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  productSub!:Subscription;
  cartSub!:Subscription;
  productDetails:IProduct | null = null
  routeSub!:Subscription;


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }


  ngOnInit(): void {
    this.routeSub = this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        let productId =  param.get('id')
        this.productSub = this._ProductsService.getSpecificProducts(productId).subscribe({
          next:(res)=>{
            this.productDetails = res.data;
            console.log(res.data);
          },
          error:(err)=>{
            console.log(err);
          }
        })
      },
      error:(err)=>{
        console.log(err);
      }
    })
  } 

  addProduct(id:string):void{
    this.cartSub = this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message, 'Success');
        this._CartService.cartNum.next(res.numOfCartItems);
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.productSub?.unsubscribe();
    this.cartSub?.unsubscribe();
  }
}
