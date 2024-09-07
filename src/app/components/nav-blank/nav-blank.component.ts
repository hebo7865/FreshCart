import { RouterLinkActive, RouterLink } from '@angular/router';
import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit, OnDestroy {

  readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);
  cartCount:number = 0;
  cartSub!:Subscription;
  userCartSub!:Subscription;

  constructor(private _FlowbiteService:FlowbiteService){
    this._FlowbiteService.loadFlowbite(()=>{

    })
  }

  ngOnInit(): void {
    this.userCartSub = this._CartService.getUserCart().subscribe({
      next:(res)=>{
        this._CartService.cartNum.next(res.numOfCartItems)
      }
    })
    this.cartSub = this._CartService.cartNum.subscribe({
      next:(data)=>{
        this.cartCount = data;
      }
    })  
  }

  ngOnDestroy(): void {
      this.cartSub?.unsubscribe();
      this.userCartSub?.unsubscribe();
  }

}
