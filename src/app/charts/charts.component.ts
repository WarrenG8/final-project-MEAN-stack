import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, ActivatedRoute } from '@angular/router';

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
  
  price;
  percentChange;
  pricesArr2;
  timeSeries;

  constructor(private stk: StockService) {
    // this.fetch();
    // setTimeout( _ => {
    //       this.lineChartData = [{data: [], label: '3 month'}];
    //       console.log('Hit', this.lineChartData); }, 3000 )
  }
  
    // @ViewChild(NavbarComponent) symbol: NavbarComponent;
    searchSymbol() {
      return this.symbol;
    }
  
  fetch() {

    this.stk.getDailyData()
     .subscribe(res => {
        this.symbol = res["Meta Data"]["2. Symbol"];
        this.price = Number(res["Time Series (Daily)"]["2018-09-12"]["4. close"]).toFixed(2);
        this.percentChange = (((res["Time Series (Daily)"]["2018-09-12"]["4. close"]- res["Time Series (Daily)"]["2018-09-11"]["4. close"])/ res["Time Series (Daily)"]["2018-09-11"]["4. close"]) * 100).toFixed(2) + '%';
        this.pricesArr = Object.keys(res["Time Series (Daily)"]).map(key => Number(res["Time Series (Daily)"][key]["4. close"]).toFixed(2)).reverse();
        
        // console.log(res)
      }, err => {
        console.log(err)
      });
      // 1 day wiew
      // this.stk.get1DayViewData()
      // .subscribe(x => {
      //   // this.times = Object.keys(x["Time Series (15min)"]).reverse();
      //   // this.pricesWeek = this.times.map(key => Number(Number(x["Time Series (15min)"][key]["4. close"]).toFixed(2)));
      //   console.log(x);
      //   // console.log(this.times);
      //   // console.log(this.pricesWeek);
      // }, err => {
      //     console.log(err)
      // });
      
      // // 1 week wiew
      // this.stk.get1WeekViewData()
      // .subscribe(x => {
      //   this.times = Object.keys(x["Time Series (15min)"]).reverse();
      //   this.pricesWeek = this.times.map(key => Number(Number(x["Time Series (15min)"][key]["4. close"]).toFixed(2)));
      //   console.log(x);
      //   console.log(this.times);
      //   console.log(this.pricesWeek);
      // }, err => {
      //     console.log(err)
      // });
      
      // 3 month view
      this.stk.getDailyData()
       .subscribe(res => {
        this.dates = Object.keys(res["Time Series (Daily)"])
          .filter((key, index) => index <= 62)
          .reverse();
        this.pricesArr = this.dates
          .map((key) => Number(Number(res["Time Series (Daily)"][key]["4. close"]).toFixed(2)));
          console.log(this.pricesArr);
          console.log(this.dates);
          this.lineChartData = [{data: [9, 9, 9, 9, 9, 9, 9], label: '3 month'}];
          console.log('Hit', this.lineChartData);
          // console.log(res)
        }, err => {
          console.log(err)
        });
  }
  
  
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series a'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


  ngOnInit() {
  }

}
