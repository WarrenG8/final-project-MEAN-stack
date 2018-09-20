import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routes } from './app.router';

import { AppComponent } from './app.component';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StockService } from './stock.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ChartsComponent } from './charts/charts.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ClarityModule,
    ClrFormsNextModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartsModule,
    routes
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
