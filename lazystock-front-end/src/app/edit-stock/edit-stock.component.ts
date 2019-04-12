import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StockService } from '../stock.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent implements OnInit {
  id;
  updateStockForm = new FormGroup({
    name: new FormControl(''),
    symbol: new FormControl(''),
    current_price: new FormControl('')
  });

  constructor(private auth: AuthService, 
    private router: Router,
    private route: ActivatedRoute,
    private stock: StockService) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  updateStock(id){
    this.stock.updateStock(id, this.updateStockForm.value).subscribe(() => {
      this.router.navigate(['/dashboard']);             
    }, (err) => {
      console.log(err);
    });
  }

}