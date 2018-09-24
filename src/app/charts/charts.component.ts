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
  currentDay;
  dayBefore;
  symbolClicked: boolean = false;
  intraday: string = 'function=TIME_SERIES_INTRADAY';
  daily: string = 'function=TIME_SERIES_DAILY';
  weekly: string = "function=TIME_SERIES_WEEKLY";
  monthly: string = "function=TIME_SERIES_MONTHLY_ADJUSTED";
  favArr;
  favorite: any = {};
  
  
  constructor(private stk: StockService, public userService : UserService, private router: Router) {
    this.getFavorites();
    this.dateGen();
  }
  
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [
  ];
  
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
  
  dateGen() {
    let today = moment();
    if(today === moment().isoWeekday("Sunday") || today === moment().isoWeekday("Saturday")) {
      this.currentDay = moment().isoWeekday("Friday").format("YYYY-MM-DD");
      this.dayBefore = moment().isoWeekday("Thursday").format("YYYY-MM-DD");
    } else if(moment().isoWeekday("Monday")) {
      this.currentDay = moment().format("YYYY-MM-DD");
      this.dayBefore = moment().subtract(1, 'week').isoWeekday("Friday").format("YYYY-MM-DD");
    } else {
      this.currentDay = moment().format("YYYY-MM-DD");
      this.dayBefore = moment().subtract(1, 'day').format("YYYY-MM-DD");
    }
  }
  
  searchSymbol() {
    this.symbolClicked = true;
    
    this.stk.getMonthData(this.symbol)
    .subscribe(res => {
      console.log(this.currentDay);
      console.log(this.dayBefore);
      // if 1st view line chart data should come from intraday url
        // lineChartData should be equal to     
      this.price = '$' + Number(res["Time Series (Daily)"][this.currentDay]["4. close"]).toFixed(2);
      this.percentChange = (((res["Time Series (Daily)"][this.currentDay]["4. close"]- res["Time Series (Daily)"][this.dayBefore]["4. close"])/ res["Time Series (Daily)"][this.dayBefore]["4. close"]) * 100).toFixed(2) + '%';
      this.lineChartData = Object.keys(res["Time Series (Daily)"]).map(key => Number(res["Time Series (Daily)"][key]["4. close"]).toFixed(2)).reverse();
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
  
  getFavorites() {
    this.userService.getFavorites()
    .subscribe((res) => {
      this.favArr = res;
      console.log(res);
    });
  }
  
  addToFav(){
    let newFav = this.symbol.toUpperCase();
    if(this.favArr.findIndex(stk => stk.stock === newFav) >= 0) {
      alert('This stock has already been added to your favorites.')
    } else {
    this.favorite.stock = newFav;
    this.favorite.userId = window.sessionStorage.getItem("userId");
    this.userService.addToFavorites(this.favorite)
    .subscribe((res) => {
      console.log(res);
    });
    }
  }
  
  ngOnInit() {
  }

}
