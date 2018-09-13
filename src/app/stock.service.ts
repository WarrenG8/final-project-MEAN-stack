import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  fun;
  symbol;
  
  urlIntraday: string = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=NKQMMWPSW3I1OPE6"
  urlDaily: string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=NKQMMWPSW3I1OPE6";
  urlWeekly: string = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=NKQMMWPSW3I1OPE6";
  
  constructor(private http: HttpClient) { }
  
  getIntradayData(){
    return this.http.get(this.urlIntraday);
  }
  
  getDailyData(){
    return this.http.get(this.urlDaily);
  }
  
  getWeeklyData(){
    return this.http.get(this.urlWeekly);
  }
  
}
