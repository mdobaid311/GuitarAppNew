import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AreaSplineChartComponent } from './components/charts/area-spline-chart/area-spline-chart.component';
import { OrgChartComponent } from './components/charts/org-chart/org-chart.component';
import { SalesComponent } from './components/sales-module/sales/sales.component';
import { SettingsComponent } from './components/settings/settings.component';
import { Orgchart2Component } from './components/charts/orgchart2/orgchart2.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'area-chart', component: AreaSplineChartComponent },
  { path: 'org-chart', component: OrgChartComponent },
  { path: 'org-chart-1', component: Orgchart2Component },
  { path: 'sales', component: SalesComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
