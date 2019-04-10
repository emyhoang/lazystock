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

  public postNewStock(stockData) {
    return this.http.post( this.baseURL + '/stocks', stockData, { headers: this.auth.defaultHeaders() }), 
    this.router.navigateByUrl('/dashboard');;
  }

}



