import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stockList = [];

  constructor(private auth: AuthService, private route: Router, private stock: StockService) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.route.navigate(['/login']);
    }
    this.stock.getStockDetails().subscribe(res => {
      this.stockList = res['stocks']
    }, (err) => {
      console.log(err);
    }) 
  }



}
