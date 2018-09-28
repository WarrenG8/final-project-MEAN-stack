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
  cryptoPrices;
  
  
  
  constructor(private stk: StockService, public userService : UserService, private router: Router) {
    this.getFavorites();
    this.dateGen();
    this.cryptoPrice();
    setTimeout( _ => this.cryptos.map(x => x.price = '$' + this.cryptoPrices[x.sym]['USD'].toFixed(2)), 1500 );
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
    this.changePosOrNeg();
  }
  
  changePosOrNeg() {
    return this.percentChange > 0; 
  }
  
  displayGraph(res, timeSeries, dataFilter) {
    if(res.hasOwnProperty("Error Message")) {
      this.symbolClicked = false;
      alert('Please enter in a valid stock symbol.');
    } else if (!res.hasOwnProperty("Meta Data") && res.hasOwnProperty("Information")) {
      alert('API is slow. Please wait a few seconds and try again.');
    } else {
      this.lineChartData = Object.keys(res[timeSeries]).map(key => Number(res[timeSeries][key]["4. close"]).toFixed(2)).filter((x, idx) => idx < dataFilter).reverse();
      let tempLabels = Object.keys(res[timeSeries]).filter((x, idx) => idx < dataFilter).reverse();
      this.lineChartLabels.length = 0;
      this.lineChartLabels.push(...tempLabels);
    }
    
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
    let dataFilter = 65;
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
    let dataFilter = 128;
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
  
  selectFavorite(symbol) {
    console.log(symbol);
    this.symbol = symbol;
    this.searchSymbol();
  }

  searchSymbol() {
    if(this.symbol === undefined) {
      alert('Please enter in a valid stock symbol.')
    } else {
      this.symbolClicked = true;
      this.symbolSaved = this.symbol.toUpperCase();
      this.loading();
      let timeSeries = "Time Series (Daily)";
      let dataFilter = 65;
      this.stk.getMonthToYearData(this.symbolSaved)
      .subscribe(res => {
        if(res.hasOwnProperty("Error Message")) {
          this.symbolClicked = false;
          alert('Please enter in a valid stock symbol.');
        } else if (!res.hasOwnProperty("Meta Data")) {
          this.symbolClicked = false;
          alert('API is slow. Please wait a few seconds and try again.');
        } else
          this.currentPrice(res);
          this.displayGraph(res, timeSeries, dataFilter);
          this.symbol = '';
          this.isFavorite();
          console.log(res);
      });
    }
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
      setTimeout( _ => this.getFavorites(), 1000 );
    }
  }
  
  removeFromFav() {
    let fav = this.symbolSaved;
    let idx = this.favArr.findIndex(stk => stk.stock === fav);
    console.log(idx);
    let toBeRemoved = this.favArr[idx].id;
    console.log(toBeRemoved);
    this.userService.deleteFromFavorites(toBeRemoved)
    .subscribe((res) => console.log(res));
    setTimeout( _ => this.getFavorites(), 1000 );
  }
  
  isFavorite(){
    return this.favArr.findIndex(stk => stk.stock === this.symbolSaved) >= 0;
  }
  
  
  
  cryptoPrice() {
    this.stk.getCrypto()
    .subscribe((res) => {
      this.cryptoPrices = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  
  cryptos = [
    {'name' :'Bitcoin', 'sym': 'BTC', 'price': ''}, 
    {'name':'Bitcoin Cash', 'sym': 'BCH', 'price': ''}, 
    {'name': 'Ethereum', 'sym': 'ETH', 'price': ''}, 
    {'name' : 'Ethereum Cash', 'sym': 'ETC', 'price': ''},
    {'name' : 'Litecoin', 'sym': 'LTC', 'price': ''},
  ];
  
  ngOnInit() {
  }
  
  loading() {
    return this.symbolClicked && this.lineChartLabels.length < 1;
  }
  
  
}
