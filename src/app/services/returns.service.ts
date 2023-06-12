import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequestService } from '../http-request.service';
import { APP_CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ReturnsService {
  constructor(private httpClient: HttpClient) {}

  public getReturnsData(date: any) {
    const url = `${APP_CONSTANTS.URI}/v2/returns/getReturnsData?date=${date}`;
    return this.httpClient.get<any[]>(url);
  }
}
