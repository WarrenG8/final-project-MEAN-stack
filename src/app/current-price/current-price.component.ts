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

  constructor(private stk: StockService) {
    this.fetch();
  }
  
  fetch() {
    this.stk.getData()
     .subscribe(res => {
      this.symbol = res["Meta Data"]["2. Symbol"];
      this.price = res["Time Series (Daily)"]["2018-09-12"]["4. close"];
       console.log(res)
      }, err => {
        console.log(err)
      })
  }
  
  ngOnInit() {
  }

}
