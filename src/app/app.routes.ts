import { WishlistComponent } from './components/wishlist/wishlist.component';
import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { DetailsComponent } from './components/details/details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlancLayoutComponent } from './layouts/blanc-layout/blanc-layout.component';

export const routes: Routes = [
    {path:'', component:AuthLayoutComponent, canActivate:[logedGuard], children:[
        {path:'', redirectTo:'login', pathMatch:'full'},
        {path:'login', component:LoginComponent},
        {path:'register', component:RegisterComponent},
        {path:'forgot', component:ForgotPasswordComponent},
    ]},
    {path:'', component:BlancLayoutComponent, canActivate:[authGuard], children:[
        {path:'', redirectTo:'home', pathMatch:'full'},
        {path:'home', component:HomeComponent},
        {path:'products', component:ProductComponent},
        {path:'cart', component:CartComponent},
        {path:'brands', loadComponent:()=> import('./components/brands/brands.component').then((c)=> c.BrandsComponent)},
        {path:'categories', loadComponent:()=> import ('./components/categories/categories.component').then((c)=> c.CategoriesComponent)},
        {path:'wishlist', loadComponent:()=> import ('./components/wishlist/wishlist.component').then((c)=> c.WishlistComponent)},
        {path:'details/:id', component:DetailsComponent},
        {path:'allorders', loadComponent:()=> import('./components/allorders/allorders.component').then((c)=>c.AllordersComponent)},
        {path:'orders/:id', loadComponent:()=> import('./components/orders/orders.component').then((c)=>c.OrdersComponent)},
    ]},
    {path:'**', component:NotfoundComponent}
];
