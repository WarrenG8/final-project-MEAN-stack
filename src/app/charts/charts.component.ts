import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../user.service';
import * as moment from 'moment';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent  {
  pricesArr;
  symbol;
  symbolSaved;
  user;
  price;
  percentChange;
  currentDay;
  dayBefore;
  symbolClicked: boolean = false;
  favArr;
  favorite: any = {};
  removeFav: any = {};
  
  
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
  
  currentPrice(res) {
    this.price = '$' + Number(res["Time Series (Daily)"][this.currentDay]["4. close"]).toFixed(2);
    this.percentChange = (((res["Time Series (Daily)"][this.currentDay]["4. close"]- res["Time Series (Daily)"][this.dayBefore]["4. close"])/ res["Time Series (Daily)"][this.dayBefore]["4. close"]) * 100).toFixed(2) + '%';
  }
  
  displayGraph(res, timeSeries, dataFilter) {
    this.lineChartData = Object.keys(res[timeSeries]).map(key => Number(res[timeSeries][key]["4. close"]).toFixed(2)).filter((x, idx) => idx < dataFilter).reverse();
    let tempLabels = Object.keys(res[timeSeries]).filter((x, idx) => idx < dataFilter).reverse();
    this.lineChartLabels.length = 0;
    this.lineChartLabels.push(...tempLabels);
  }
  
  dayView(){
    console.log(this.symbolSaved);
    let timeSeries = "Time Series (5min)";
    let dataFilter = 88;
    this.stk.get1DayData(this.symbolSaved)
    .subscribe(res => {
      this.displayGraph(res, timeSeries, dataFilter);
      console.log(res)
      }, err => {
        console.log(err)
      })
  }
  
  weekView(){
    let timeSeries = "Time Series (30min)";
    let dataFilter = 48;
    this.stk.get1WeekData(this.symbolSaved)
    .subscribe(res => {
      this.displayGraph(res, timeSeries, dataFilter);
      console.log(res)
      }, err => {
        console.log(err)
      })
  }
  
  threeMonthView() {
    let timeSeries = "Time Series (Daily)";
    let dataFilter = 64;
    this.stk.getMonthToYearData(this.symbolSaved)
    .subscribe(res => {
      this.displayGraph(res, timeSeries, dataFilter);
      console.log(res)
      }, err => {
        console.log(err)
      })
  }
  
  sixMonthView(){
    let timeSeries = "Time Series (Daily)";
    let dataFilter = 253;
    this.stk.getMonthToYearData(this.symbolSaved)
    .subscribe(res => {
      this.displayGraph(res, timeSeries, dataFilter);
      console.log(res)
      }, err => {
        console.log(err)
      })
  }
  
  yearView(){
    let timeSeries = "Time Series (Daily)";
    let dataFilter = 253;
    this.stk.getMonthToYearData(this.symbolSaved)
    .subscribe(res => {
      this.displayGraph(res, timeSeries, dataFilter);
      console.log(res);
      }, err => {
        console.log(err)
      })
  }
  
  fiveYearView(){
    console.log(this.symbolSaved);
    let timeSeries = "Weekly Time Series";
    let dataFilter = 263;
    this.stk.get5YearData(this.symbolSaved)
    .subscribe(res => {
      this.displayGraph(res, timeSeries, dataFilter);
      console.log(res)
      }, err => {
        console.log(err)
      })
  }

  searchSymbol() {
    this.symbolClicked = true;
    this.symbolSaved = this.symbol.toUpperCase();
    let timeSeries = "Time Series (Daily)";
    let dataFilter = 64;
    this.stk.getMonthToYearData(this.symbolSaved)
    .subscribe(res => {
        this.currentPrice(res);
        this.displayGraph(res, timeSeries, dataFilter);
        this.symbol = '';
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
    let newFav = this.symbolSaved.toUpperCase();
    if(this.favArr.findIndex(stk => stk.stock === newFav) >= 0) {
      alert('This stock has already been added to your favorites.')
    } else {
      this.favorite.stock = newFav;
      this.favorite.userId = window.sessionStorage.getItem("userId");
      this.favArr.push(newFav);
      this.userService.addToFavorites(this.favorite)
      .subscribe((res) => console.log(res));
      this.getFavorites();
    }
  }
  
  removeFromFav() {
    let fav = this.symbol.toUpperCase();
    if(this.favArr.findIndex(stk => stk.stock === fav) < 0) {
      alert('This stock has already been added to your favorites.')
    } else {
    this.favorite.stock = fav;
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
