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
  weekViewInt: string = 'interval=15min';
  
  // url1DayView: string = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=NKQMMWPSW3I1OPE6";
  // url1WeekView: string = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=15min&apikey=NKQMMWPSW3I1OPE6";
  // urlDaily: string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=NKQMMWPSW3I1OPE6";
  // urlWeekly: string = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=NKQMMWPSW3I1OPE6";
  // urlMonthly: string = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=MSFT&apikey=NKQMMWPSW3I1OPE6";
  
  constructor(private http: HttpClient) { }
  
  get1DayData(symbol){
    return this.http.get(this.url + this.intraday  + '&symbol=' + symbol + '&interval=5min'+ this.api);
  }
  
  get1WeekData(symbol){
    return this.http.get(this.url + this.intraday  + '&symbol=' + symbol + '&interval=30min' + this.api);
  }
  
  getMonthData(symbol){
    return this.http.get(this.url + this.daily  + '&symbol=' + symbol + '&outputsize=full' + this.api);
  }
  
  get5YearData(symbol) {
    return this.http.get(this.url + this.weekly  + '&symbol=' + symbol + this.api);
  }
  
  getCrypto(symbol) {
    return this.http.get(this.url + 'function=DIGITAL_CURRENCY_DAILY'  + '&symbol=' + symbol + this.api);
  }
  
}
