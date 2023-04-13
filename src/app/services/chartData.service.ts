import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { APP_CONSTANTS } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import { map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private httpClient: HttpClient,private httpReqService: HttpRequestService,private router: Router) { }



  public getData(year:any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_TOTAL}?year=${year}`;
           return this.httpClient.get<any[]>(url);
  }

  // public getData(): Observable<any[]>  {
  //   const requestBody = {
  //     columns:["INVOICED_LINE_TOTAL"]
  //   };

  //   return this.httpClient.post<any[]>(environment.SERVICE_APIS.ORIGINAL_TOTAL + 'include', requestBody)
  // }
}


