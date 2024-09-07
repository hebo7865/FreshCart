import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {

  constructor(private _FlowbiteService:FlowbiteService){
    this._FlowbiteService.loadFlowbite(()=>{

    })
  }

  private readonly _CategoriesService = inject(CategoriesService);
  categoriesList:ICategory[] = [];
  categoriesSub!:Subscription;

  ngOnInit(): void {
      this.categoriesSub = this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.categoriesList = res.data
        }
      })
  }

  ngOnDestroy(): void {
      this.categoriesSub?.unsubscribe();
  }
}
