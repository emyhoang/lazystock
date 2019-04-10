import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseURL = 'http://localhost:3000/api';


  constructor(private http: HttpClient, private router: Router) { }
}
