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
  dayViewInt: string = 'interval=5min';
  weekViewInt: string = 'interval=15min';
  
  // url1DayView: string = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=NKQMMWPSW3I1OPE6";
  // url1WeekView: string = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=15min&apikey=NKQMMWPSW3I1OPE6";
  // urlDaily: string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=NKQMMWPSW3I1OPE6";
  // urlWeekly: string = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=NKQMMWPSW3I1OPE6";
  // urlMonthly: string = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=MSFT&apikey=NKQMMWPSW3I1OPE6";
  
  constructor(private http: HttpClient) { }
  
  get1DayData(symbol){
    return this.http.get(this.url + this.intraday  + '&symbol=' + symbol + this.dayViewInt + this.api);
  }
  
  get1WeekData(symbol){
    return this.http.get(this.url + this.intraday  + '&symbol=' + symbol + this.weekViewInt + this.api);
  }
  
  getMonthData(symbol){
    return this.http.get(this.url + this.daily  + '&symbol=' + symbol + this.api);
  }
  
  // getWeeklyData(){
  //   return this.http.get(this.urlWeekly);
  // }
  
  // getMonthlyData(){
  //   return this.http.get(this.urlMonthly);
  // }
  
}
