import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ColumnChartComponent } from './components/charts/column-chart/column-chart.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { ThemeSwitchComponent } from './components/custom-components/theme-switch/theme-switch.component';
import { AreaSplineChartComponent } from './components/charts/area-spline-chart/area-spline-chart.component';
import { CustomHeaderComponent } from './components/custom-components/custom-header/custom-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrgChartComponent } from './components/charts/org-chart/org-chart.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { CustomModalComponent } from './components/custom-components/custom-modal/custom-modal.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { CustomProgressBarComponent } from './components/custom-components/custom-progress-bar/custom-progress-bar.component';
import { SalesComponent } from './components/sales-module/sales/sales.component';
import { DaySalesCardComponent } from './components/charts/day-sales-card/day-sales-card.component';
import { CustomDaterangePickerComponent } from './components/custom-components/custom-daterange-picker/custom-daterange-picker.component';
import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CustomSelectComponent } from './components/custom-components/custom-select/custom-select.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { SettingsComponent } from './components/settings/settings.component';
import { Orgchart2Component } from './components/charts/orgchart2/orgchart2.component';
import { CustomTableComponent } from './components/custom-components/custom-table/custom-table.component';
import { CustomGuitarLoaderComponent } from './components/custom-components/custom-guitar-loader/custom-guitar-loader.component';
import { CustomGridComponent } from './components/custom-components/custom-grid/custom-grid.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ColumnChartComponent,
    BarChartComponent,
    ThemeSwitchComponent,
    AreaSplineChartComponent,
    CustomHeaderComponent,
    SidebarComponent,
    OrgChartComponent,
     CustomModalComponent,
    CustomProgressBarComponent,
    SalesComponent,
    DaySalesCardComponent,
    CustomDaterangePickerComponent,
    CustomSelectComponent,
    PieChartComponent,
    SettingsComponent,
    Orgchart2Component,
    CustomTableComponent,
    CustomGuitarLoaderComponent,
    CustomGridComponent,
    LineChartComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    FontAwesomeModule,
    OrganizationChartModule,
    AngularMyDatePickerModule,
    BrowserAnimationsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
