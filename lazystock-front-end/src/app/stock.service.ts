import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  public getStockDetails() {
    return this.http.get( this.baseURL + '/stocks', { headers: this.auth.defaultHeaders() });
  }

  public getStockById(id){
    return this.http.get( this.baseURL + '/stocks/' + id, { headers: this.auth.defaultHeaders() } )
  }

  public postNewStock(stockData) {
    return this.http.post( this.baseURL + '/stock', stockData, { headers: this.auth.defaultHeaders() })
  }

  public delStock(id) {
    return this.http.delete( this.baseURL + '/stock/' + id, { headers: this.auth.defaultHeaders() })
  }

  public updateStock(id, data) {
    return this.http.put(this.baseURL + '/stock/' + id, data, { headers: this.auth.defaultHeaders() } )
  }

}



