import { Component } from '@angular/core';
import { StockService } from './stock.service';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  symbol;
    
  
  constructor(private stk: StockService) {
    this.fetch();
  }
  
  fetch() {
    this.stk.getDailyData()
     .subscribe(res => {
      this.symbol = res["Meta Data"]["2. Symbol"];
       console.log(res)
      }, err => {
        console.log(err)
      })
  }
  
}
