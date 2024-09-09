import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from './../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, CurrencyPipe, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly _WishlistService = inject(WishlistService);

  productsList:IProduct[] = [];
  categoriesList:ICategory[] = [];
  productSub!:Subscription;
  categoriesSub!:Subscription;
  cartSub!:Subscription;
  wishlistSub!:Subscription;



  customOptionMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 4000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  customCategoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      },
      1200: {
        items: 4
      }
    },
    nav: true
  }


  ngOnInit(): void {
    this._NgxSpinnerService.show('home-loading');
    this.productSub = this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productsList = res.data
        this._NgxSpinnerService.hide('home-loading')
      }
    })  

    this.categoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesList = res.data
      }
    })
  };

  addProductToCart(id:string):void{
    this.cartSub = this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message, 'Success');
        this._CartService.cartNum.next(res.numOfCartItems);
      }
    })
  }

addProductToWishlist(id:string):void{
  this._WishlistService.addToWislist(id).subscribe({
    next:(res)=>{
      this._ToastrService.success(res.message, 'Succes');
    }
  })
}



  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
    this.categoriesSub?.unsubscribe();
    this.cartSub?.unsubscribe();
  };


}
