import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-current-price',
  templateUrl: './current-price.component.html',
  styleUrls: ['./current-price.component.css']
})
export class CurrentPriceComponent implements OnInit {
  price;
  symbol;
  percentChange;

  constructor(private stk: StockService) {
    this.fetch();
  }
  
  fetch() {
    this.stk.getDailyData()
     .subscribe(res => {
      this.symbol = res["Meta Data"]["2. Symbol"];
      this.price = Number(res["Time Series (Daily)"]["2018-09-12"]["4. close"]).toFixed(2);
      this.percentChange = (((res["Time Series (Daily)"]["2018-09-12"]["4. close"]- res["Time Series (Daily)"]["2018-09-11"]["4. close"])/ res["Time Series (Daily)"]["2018-09-11"]["4. close"]) * 100).toFixed(2) + '%';
       console.log(res)
      }, err => {
        console.log(err)
      })
  }
  
  
  ngOnInit() {
  }

}
