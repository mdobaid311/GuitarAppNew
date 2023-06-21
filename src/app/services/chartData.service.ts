import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { APP_CONSTANTS } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: any;

  constructor(private apiService: ChartService) {}

  getData() {
    return this.data;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  dataArray = new Subject<Array<any>>();
  booleanSubject = new BehaviorSubject<boolean>(false);
  colChartPinToDB = new BehaviorSubject<boolean>(false);
  barChartPinToDB = new BehaviorSubject<boolean>(false);
  pieChartPinToDB = new BehaviorSubject<boolean>(false);
  lineChartPinToDB = new BehaviorSubject<boolean>(false);
  selectedRange = new Subject<any>();

  constructor(
    private httpClient: HttpClient,
    private httpReqService: HttpRequestService,
    private router: Router
  ) {}

  public getData(year: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_TOTAL}?year=${year}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalForRange(start_date: any, end_date: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_TOTAL}?start_date=${start_date}&&end_date=${end_date}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalForYear(year: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_MONTH}?forYear=${year}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalYears() {
    const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_YEAR}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalByDay(year: any, month: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_DAY}?year=${year}&month=${month}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalByHour(year: any, month: any, day: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_HOUR}?year=${year}&month=${month}&day=${day}`;
    return this.httpClient.get<any[]>(url);
  }

  // public getTodaysOrderTotal(year: any, month: any, day: any) {
  //   const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_HOUR}?year=2023&month=3&day=31`;
  //   return this.httpClient.get<any[]>(url);
  // }

  public getTodaysOrderTotal() {
    const url = `${environment.SERVICE_APIS.ORIGINAL_TOTAL}?start_date=2023-01-31&&end_date=2023-01-31`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrgChartData() {
    const url = `${environment.SERVICE_APIS.ORG_CHART}?startDate='2015-01-01 00:00'&endDate='2023-01-31 01:00'`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrgChartDataByRange(startDate: any, endDate: any, type: any) {
    const url = `${APP_CONSTANTS.URI}/v2/sales/getOrgChartData?start_date=${startDate}&end_date=${endDate}&type=${type}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalByDayRange(startDate: any, endDate: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_DAY_RANGE}?startDate=${startDate}&&endDate=${endDate}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalByHourRange(startDate: any, endDate: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_HOUR_RANGE}?startDate=${startDate}&&endDate=${endDate}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalByMonthRange(startDate: any, endDate: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_MONTH_RANGE}?startDate=${startDate}&&endDate=${endDate}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalByYearRange(startDate: any, endDate: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_YEAR_RANGE}?startDate=${startDate}&&endDate=${endDate}`;
    return this.httpClient.get<any[]>(url);
  }

  public getFullSalesData(startDate: any, endDate: any, intervaltime: any) {
    const url = `${APP_CONSTANTS.URI}/v2/alsd/get-full-sales-data?start_date=${startDate}&end_date=${endDate}&intervaltime=${intervaltime}`;
    return this.httpClient.get<any[]>(url);
  }
  public getFullSalesDataByRange(
    startDate: any,
    endDate: any,
    intervaltime: any
  ) {
    const url = `${APP_CONSTANTS.URI}/v2/tables/getFullSalesData?start_date=${startDate}&end_date=${endDate}`;
    return this.httpClient.get<any[]>(url);
  }

  public getTableData(tableName: any, startDate: any, endDate: any) {
    const url = `${APP_CONSTANTS.URI}/v2/tables?table=${tableName}&startDate=${startDate}&endDate=${endDate}`;
    return this.httpClient.get<any[]>(url);
  }

  public getMapData(startDate: any, endDate: any) {
    const url = `${APP_CONSTANTS.URI}/v2/tables/map?start_date=${startDate}&end_date=${endDate}`;
    return this.httpClient.get<any[]>(url);
  }

  public getCityData(startDate: any, endDate: any, city: any) {
    const url = `${APP_CONSTANTS.URI}/v2/tables/getCityData?start_date=${startDate}&end_date=${endDate}&city=${city}`;
    return this.httpClient.get<any[]>(url);
  }

  public getCustomQueryData(query: string,startDate: any, endDate: any) {
    const url = `${APP_CONSTANTS.URI}/v2/tables/query`;
    const requestBody = {
      query: query,
      startDate: startDate,
      endDate: endDate
    };
    return this.httpClient.post<any[]>(url, requestBody);
  }

  // Time series data

  public getTimeSeriesData(date: any) {
    const url = `${APP_CONSTANTS.URI}/v2/tables/timeSeriesData?date=${date}`;
    return this.httpClient.get<any[]>(url);
  }

  public getTimeSeriesMilestones(date: any, userid: any) {
    const url = `${APP_CONSTANTS.URI}/v2/tables/getDataForTimeSeries?date=${date}&userid=${userid}`;
    return this.httpClient.get<any[]>(url);
  }

  public setUserMilestones(msData: any) {
    const url = `${APP_CONSTANTS.URI}/v2/returns/mileStoneInfo`;
    const requestBody = msData;
    return this.httpClient.post<any[]>(url, requestBody);
  }
}
