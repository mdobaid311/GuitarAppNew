import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { AgGridModule } from 'ag-grid-angular';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ColumnChartComponent } from './components/column-chart/column-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { AreaSplineChartComponent } from './components/area-spline-chart/area-spline-chart.component';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ColumnChartComponent,
    BarChartComponent,
    AreaSplineChartComponent,
    CustomHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    AgGridModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
