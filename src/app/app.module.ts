import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ColumnChartComponent } from './components/column-chart/column-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ColumnChartComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
