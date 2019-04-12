import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { StockService } from '../stock.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  id: any;
  details: any;
  constructor(private auth: AuthService,
    private stock: StockService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    };
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.stockDetails(this.id);
  };

  stockDetails(id: any){
    this.stock.getStockById(id).subscribe( res => {
      this.details = res['stock'];
    }, (err) => {
      console.log(err);
    });
  };

}
