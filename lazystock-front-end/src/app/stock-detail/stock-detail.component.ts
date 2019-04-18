import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { StockService } from '../stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  id: any;
  details: any;
  dataSource: any;
  type: string;
  width: string;
  height: string;

  constructor(private auth: AuthService,
    private stock: StockService,
    private router: Router,
    private route: ActivatedRoute) {
    this.type = 'timeseries';
    this.width = '80%';
    this.height = '500';
    // This is the dataSource of the chart
    this.dataSource = {
      chart: {},
      
      caption: {
        text: "Stock Price"
      },
      subcaption: {
        text: "100 days of stock prices"
      },
      yaxis: [
        {
          plot: {
            value: {
              open: "Open",
              high: "High",
              low: "Low",
              close: "Close"
            },
            type: "candlestick"
          },
          format: {
            prefix: "$"
          },
          title: "Stock Value"
        }
      ]
    };
    this.fetchData();
  }

  // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
  // parameters, one is data another is schema.
  fetchData() {
    var jsonify = res => res.json();
    var dataFetch = fetch(
      "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/candlestick-chart-data.json"
    ).then(jsonify);
    var schemaFetch = fetch(
      "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-schema.json"
    ).then(jsonify);

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const [data, schema] = res;
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      this.dataSource.data = fusionTable;
    });
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    };
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.stockDetails(this.id);
  };

  stockDetails(id: any) {
    this.stock.getStockById(id).subscribe(res => {
      this.details = res['stock'];
    }, (err) => {
      console.log(err);
    });
  };
}
