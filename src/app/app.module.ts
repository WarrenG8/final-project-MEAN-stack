import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StockService } from './stock.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule }   from '@angular/forms';
import { CurrentPriceComponent } from './current-price/current-price.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CurrentPriceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
