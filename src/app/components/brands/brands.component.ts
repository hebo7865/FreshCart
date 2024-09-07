import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { IBrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit, OnDestroy{

  private readonly _BrandsService = inject(BrandsService)
  brandsList:IBrands[] = [];
  brandsSub!:Subscription;
  ngOnInit(): void {
    this.brandsSub = this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brandsList = res.data
      }
    })
  }

  ngOnDestroy(): void {
      this.brandsSub?.unsubscribe();
  }
}
