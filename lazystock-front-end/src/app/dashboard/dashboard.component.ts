import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stockList = [];
  newStockForm = new FormGroup({
    name: new FormControl(''),
    symbol: new FormControl(''),
    current_price: new FormControl('')
  })

  constructor(private auth: AuthService, private route: Router, private stock: StockService) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.route.navigate(['/login']);
    }
   this.getstocks();
  }

  getstocks(){
    this.stock.getStockDetails().subscribe(res => {
      this.stockList = res['stocks']
    }, (err) => {
      console.log(err);
    }) 
  }

  createNewStock(){
    this.stock.postNewStock(this.newStockForm.value).subscribe(()=> {
      this.getstocks();
      this.newStockForm.reset();
    }, (err) => {
      console.log(err)
    })
  }



}
