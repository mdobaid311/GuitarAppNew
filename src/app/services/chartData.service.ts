import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { APP_CONSTANTS } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import { map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private httpClient: HttpClient,private httpReqService: HttpRequestService,private router: Router) { }

  public getAllChartData(usertoken:any) {

   return this.httpReqService.request({
     method: APP_CONSTANTS.API_METHODS.GET,
     url: environment.SERVICE_APIS.LIST_ALL_PACKAGE_METHOD,
     headerConfig: {token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2IyYzE2MWI3OGFjYTI3NGMyMzU2NWMiLCJmaXJzdG5hbWUiOiJBbWphZCIsImxhc3RuYW1lIjoiaXFiYWwiLCJlbWFpbCI6ImFtamFkLmlxYmFsQGFjcnV4c3lzdGVtcy5jby51ayIsInJvbGUiOiJhY2NvdW50T3duZXIiLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTAyVDExOjM0OjU4LjIzMFoiLCJpYXQiOjE2ODA2NDE2OTZ9.p2M-yVFyGFH4bXodLkOhhhl6MhInItvOaWxGI5YT6l8'}
    })
  }

  public getData() {
    this.httpClient.get<any[]>(environment.SERVICE_APIS.LIST_ALL_PACKAGE_METHOD).subscribe({
      next: resp => {
        console.log('DATA', resp)
      }
    })
  }
}


