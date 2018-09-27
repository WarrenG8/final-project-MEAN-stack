import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  fun;
  symbol;
  
  url: string = 'https://www.alphavantage.co/query?';
  api: string = '&apikey=NQSHSF7X0RLXTNBX';
  
  intraday: string = 'function=TIME_SERIES_INTRADAY';
  daily: string = 'function=TIME_SERIES_DAILY';
  weekly: string = "function=TIME_SERIES_WEEKLY";
  
  
  constructor(private http: HttpClient) { }
  
  get1DayData(symbol){
    return this.http.get(this.url + this.intraday  + '&symbol=' + symbol + '&interval=5min'+ this.api);
  }
  
  get1WeekData(symbol){
    return this.http.get(this.url + this.intraday  + '&symbol=' + symbol + '&interval=30min' + this.api);
  }
  
  getMonthToYearData(symbol){
    return this.http.get(this.url + this.daily  + '&symbol=' + symbol + '&outputsize=full' + this.api);
  }
  
  get5YearData(symbol) {
    return this.http.get(this.url + this.weekly  + '&symbol=' + symbol + this.api);
  }
  
  getCrypto() {
    return this.http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,BCH,LTC,ETC&tsyms=USD');
  }
  
  
}
