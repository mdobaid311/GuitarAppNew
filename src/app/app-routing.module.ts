import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AreaSplineChartComponent } from './components/charts/area-spline-chart/area-spline-chart.component';
import { OrgChartComponent } from './components/charts/org-chart/org-chart.component';
import { SalesComponent } from './components/sales-module/sales/sales.component';
import { SettingsComponent } from './components/settings/settings.component';
import { Orgchart2Component } from './components/charts/orgchart2/orgchart2.component';
import { TimelineComponent } from './components/timeseries/timeline/timeline.component';
import { HorizontalTimelineComponent } from './components/timeseries/horizontal-timeline/horizontal-timeline.component';
import { UsMapComponent } from './components/charts/us-map/us-map.component';
import { MapComponent } from './components/charts/map/map.component';
import { ReturnsComponent } from './components/returns-module/returns/returns.component';
import { Timeseries2Component } from './components/timeseries/timeseries2/timeseries2.component';
import { Sales2Component } from './components/sales-module/sales2/sales2.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'area-chart', component: AreaSplineChartComponent },
  { path: 'org-chart', component: OrgChartComponent },
  { path: 'org-chart-1', component: Orgchart2Component },
  { path: 'sales-1', component: SalesComponent },
  { path: 'sales', component: Sales2Component },
  { path: 'settings', component: SettingsComponent },
  { path: 'timeseries-milestones', component: TimelineComponent },
  { path: 'timeseries', component: Timeseries2Component },
  { path: 'map', component: UsMapComponent },
  { path: 'map-2', component: MapComponent },
  {
    path: 'returns',
    component: ReturnsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
