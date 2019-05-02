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
  chartData: any;

  constructor(private auth: AuthService,
    private stock: StockService,
    private router: Router,
    private route: ActivatedRoute) {
    this.type = 'timeseries';
    this.width = '80%';
    this.height = '500';
    // This is the dataSource of the chart
    this.dataSource = {
      chart: {
        theme: "fusion"
      },
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
  };


  // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
  // parameters, one is data another is schema.
  fetchData() {
    var jsonify = res => res.json();
    const url = `http://ec2-13-57-186-239.us-west-1.compute.amazonaws.com:3000/api/timeseries?stock_id=${this.id}`
    let dataFetch = fetch(url, { headers: this.auth.defaultHeaders() }
    ).then(jsonify)

    var schemaFetch = [{
      "name": "Date",
      "type": "date",
      "format": "%Y-%m-%d"
    }, {
      "name": "Open",
      "type": "number"
    }, {
      "name": "High",
      "type": "number"
    }, {
      "name": "Low",
      "type": "number"
    }, {
      "name": "Close",
      "type": "number"
    }, {
      "name": "Volume",
      "type": "number"
    }];

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const [data, schema] = res;
      console.log(data)
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      this.dataSource.data = fusionTable;
    });
  };
  //constructor end

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    };
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.stockDetails(this.id);
      this.fetchData();
    });

  };

  stockDetails(id: any) {
    this.stock.getStockById(id).subscribe(res => {
      this.details = res['stock'];
    }, (err) => {
      console.log(err);
    });
  };
}
