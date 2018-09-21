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
  
  constructor(private stk: StockService, public userService : UserService, private router: Router) {
    
  }
  
  searchSymbol() {
    this.symbolClicked = true;
    console.log(this.symbol);
    this.stk.getData(this.symbol)
    .subscribe(res => {
      let currentDay = moment().format("YYYY-MM-DD");
      let yesterday = moment().subtract(1, 'day').format("YYYY-MM-DD");
      // this.symbol = res["Meta Data"]["2. Symbol"];
      this.price = Number(res["Time Series (Daily)"][currentDay]["4. close"]).toFixed(2);
      this.percentChange = (((res["Time Series (Daily)"][currentDay]["4. close"]- res["Time Series (Daily)"][yesterday]["4. close"])/ res["Time Series (Daily)"][yesterday]["4. close"]) * 100).toFixed(2) + '%';
      this.pricesArr = Object.keys(res["Time Series (Daily)"]).map(key => Number(res["Time Series (Daily)"][key]["4. close"]).toFixed(2)).reverse();
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
  
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  public lineChartType:string = 'line';
  
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  
  // public chartHovered(e:any):void {
  //   console.log(e);
  // }

}
