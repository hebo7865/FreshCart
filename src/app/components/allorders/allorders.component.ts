import { jwtDecode } from 'jwt-decode';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';
import { IOrders } from '../../core/interfaces/iorders';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe, CarouselModule, CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit, OnDestroy {

  private readonly _OrdersService = inject(OrdersService);
  userToken:any = jwtDecode(localStorage.getItem('userToken')!)
  ordersSub!:Subscription;
  userOrders:IOrders[] = [{} as IOrders] ;

  orderCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="text-secondary fa-solid fa-chevron-left"></i>', '<i class="text-secondary fa-solid fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }


  ngOnInit(): void {
    console.log(this.userToken);
    
    this.ordersSub = this._OrdersService.userOrders(this.userToken.id).subscribe({
      next:(res)=>{
        this.userOrders = res
        console.log(this.userOrders);
      },
      error:(err)=>{
        console.log(err);
      }
    })      
  }

  ngOnDestroy(): void {
      this.ordersSub?.unsubscribe();
  }
}
