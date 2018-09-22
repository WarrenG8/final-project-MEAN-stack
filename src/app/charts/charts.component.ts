import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent  {
  pricesArr;
  dates;
  times;
  pricesWeek;
  symbol;
  user;
  price;
  percentChange;
  pricesArr2;
  timeSeries;
  symbolClicked: boolean = false;
  newLineChartLabels;
  iterator;
  // intraday: string = 'function=TIME_SERIES_INTRADAY';
  // daily: string = 'function=TIME_SERIES_DAILY';
  // weekly: string = "function=TIME_SERIES_WEEKLY";
  // monthly: string = "function=TIME_SERIES_MONTHLY_ADJUSTED";
  
  
  constructor(private stk: StockService, public userService : UserService, private router: Router) {
    
  }
  
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  
  public lineChartType:string = 'line';
  
  public lineChartColors:Array<any> = [
    { 
      backgroundColor: '#cbe9db',
      borderColor: '#0F9D58',
      pointBackgroundColor: '#0F9D58',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  
  public lineChartOptions = {
    legend: {
      display: false,
        labels: {
          display: false,
        }
    }
  }  
  
  searchSymbol() {
    this.symbolClicked = true;
    console.log(this.symbol);
    this.stk.getData(this.symbol)
    .subscribe(res => {
      // if 1st view line chart data should come from intraday url
        // lineChartData should be equal to      
      let currentDay = moment().format("YYYY-MM-DD");
      let yesterday = moment().subtract(1, 'day').format("YYYY-MM-DD");
      let dayBefore = moment().subtract(2, 'day').format("YYYY-MM-DD");
      // this.symbol = res["Meta Data"]["2. Symbol"];
      this.price = '$' + Number(res["Time Series (Daily)"][yesterday]["4. close"]).toFixed(2);
      this.percentChange = (((res["Time Series (Daily)"][yesterday]["4. close"]- res["Time Series (Daily)"][dayBefore]["4. close"])/ res["Time Series (Daily)"][dayBefore]["4. close"]) * 100).toFixed(2) + '%';
      
      this.lineChartData = Object.keys(res["Time Series (Daily)"]).map(key => Number(res["Time Series (Daily)"][key]["4. close"])).reverse();
      console.log(this.lineChartData);
      console.log(Object.keys(res["Time Series (Daily)"]).reverse());
      let tempLabels = Object.keys(res["Time Series (Daily)"]).reverse();
      this.lineChartLabels.length = 0;
      this.lineChartLabels.push(...tempLabels);
      console.log(this.lineChartLabels);
      console.log(res)
      }, err => {
        console.log(err)
      })
  }
  
  logout(){
    this.userService.logout()
    .subscribe((res) => {
      console.log(res);
      this.router.navigate(['login']);  
    });
  }
  
  
  
  ngOnInit() {
  }
  
  // public chartHovered(e:any):void {
  //   console.log(e);
  // }

}
