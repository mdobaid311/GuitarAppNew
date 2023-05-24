import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChartService } from './chartData.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SalesDataService {
  private salesData = new BehaviorSubject([]);
  currentSalesData = this.salesData.asObservable();

  changeData(data: any) {
    this.salesData.next(data);
  }

  constructor(private httpClient: HttpClient) {}

  public getTopItems(startDate: any, endDate: any, intervaltime: any) {
    const url = `http://localhost:3000/v2/sales/getTopItems?start_date=2023-02-01&end_date=2023-05-06&intervaltime=172800`;
    return this.httpClient.get<any[]>(url);
  }

  public getChartData(startDate: any, endDate: any, intervaltime: any) {
    const url = `http://localhost:3000/v2/sales/getChartData?start_date=2023-02-01&end_date=2023-05-06&intervaltime=172800`;
    return this.httpClient.get<any[]>(url);
  }

  public getSalesCategories(startDate: any, endDate: any, intervaltime: any) {
    const url = `http://localhost:3000/v2/sales/getSalesCategories?start_date=2023-02-01&end_date=2023-05-06&intervaltime=172800`;
    return this.httpClient.get<any[]>(url);
  }

  public getTotalStats(startDate: any, endDate: any, intervaltime: any) {
    const url = `http://localhost:3000/v2/sales/getTotalStats?start_date=2023-02-01&end_date=2023-02-06&intervaltime=172800`;
    return this.httpClient.get<any[]>(url);
  }
}

class IYear {
  'year': string;
  'total': number;
}
