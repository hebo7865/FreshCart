import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private readonly _HttpClient:HttpClient) { }

  checkOut(id:string | null, shipingDetail:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environment.serverUrl}`,
      {
        "shippingAddress":shipingDetail
      },
    )
  }

  userOrders(id:any):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`,)
  }
}
