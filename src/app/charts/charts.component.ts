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
  
  dayView(){
    console.log(this.symbolSaved);
    this.stk.get1DayData(this.symbolSaved)
    .subscribe(res => {
      this.lineChartData = Object.keys(res["Time Series (5min)"]).map(key => Number(res["Time Series (5min)"][key]["4. close"]).toFixed(2)).filter((x, idx) => idx < 88).reverse();
      let tempLabels = Object.keys(res["Time Series (5min)"]).filter((x, idx) => idx < 88).reverse();
      this.lineChartLabels.length = 0;
      this.lineChartLabels.push(...tempLabels);
      console.log(res)
      }, err => {
        console.log(err)
      })
  }
  
  weekView(){
    this.stk.get1WeekData(this.symbolSaved)
    .subscribe(res => {
      this.lineChartData = Object.keys(res["Time Series (30min)"]).map(key => Number(res["Time Series (30min)"][key]["4. close"]).toFixed(2)).filter((x, idx) => idx < 48).reverse();
      let tempLabels = Object.keys(res["Time Series (30min)"]).filter((x, idx) => idx < 48).reverse();
      this.lineChartLabels.length = 0;
      this.lineChartLabels.push(...tempLabels);
      console.log(res)
      }, err => {
        console.log(err)
      })
  }
  
  sixMonthView(){
    this.stk.getMonthData(this.symbolSaved)
    .subscribe(res => {
      this.lineChartData = Object.keys(res["Time Series Daily"]).map(key => Number(res["Time Series Daily"][key]["4. close"]).toFixed(2)).filter((x, idx) => idx < 127).reverse();
      let tempLabels = Object.keys(res["Time Series Daily"]).filter((x, idx) => idx < 127).reverse();
      this.lineChartLabels.length = 0;
      this.lineChartLabels.push(...tempLabels);
      console.log(res)
      }, err => {
        console.log(err)
      })
  }
  
  yearView(){
    this.stk.getMonthData(this.symbolSaved)
    .subscribe(res => {
      this.lineChartData = Object.keys(res["Time Series Daily"]).map(key => Number(res["Time Series Daily"][key]["4. close"]).toFixed(2)).filter((x, idx) => idx < 253).reverse();
      let tempLabels = Object.keys(res["Time Series Daily"]).filter((x, idx) => idx < 253).reverse();
      this.lineChartLabels.length = 0;
      this.lineChartLabels.push(...tempLabels);
      console.log(res)
      }, err => {
        console.log(err)
      })
  }
  
  fiveYearView(){
    console.log(this.symbolSaved);
    this.stk.get5YearData(this.symbolSaved)
    .subscribe(res => {
      this.lineChartData = Object.keys(res["Weekly Time Series"]).map(key => Number(res["Weekly Time Series"][key]["4. close"]).toFixed(2)).filter((x, idx) => idx < 263).reverse();
      let tempLabels = Object.keys(res["Weekly Time Series"]).filter((x, idx) => idx < 263).reverse();
      this.lineChartLabels.length = 0;
      this.lineChartLabels.push(...tempLabels);
      console.log(res)
      }, err => {
        console.log(err)
      })
  }

  searchSymbol() {
    this.symbolClicked = true;
    this.symbolSaved = this.symbol.toUpperCase();
    this.stk.getMonthData(this.symbol)
    .subscribe(res => {
        this.price = '$' + Number(res["Time Series (Daily)"][this.currentDay]["4. close"]).toFixed(2);
        this.percentChange = (((res["Time Series (Daily)"][this.currentDay]["4. close"]- res["Time Series (Daily)"][this.dayBefore]["4. close"])/ res["Time Series (Daily)"][this.dayBefore]["4. close"]) * 100).toFixed(2) + '%';
        this.lineChartData = Object.keys(res["Time Series (Daily)"]).map(key => Number(res["Time Series (Daily)"][key]["4. close"]).toFixed(2)).filter((x, idx) => idx < 127).reverse();
        let tempLabels = Object.keys(res["Time Series (Daily)"]).filter((x, idx) => idx < 127).reverse();
        this.lineChartLabels.length = 0;
        this.lineChartLabels.push(...tempLabels);
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
    let newFav = this.symbol.toUpperCase();
    if(this.favArr.findIndex(stk => stk.stock === newFav) >= 0) {
      alert('This stock has already been added to your favorites.')
    } else {
    this.favorite.stock = newFav;
    this.favorite.userId = window.sessionStorage.getItem("userId");
    this.favArr.push(newFav);
    this.userService.addToFavorites(this.favorite)
    .subscribe((res) => {
      console.log(res);
    });
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
