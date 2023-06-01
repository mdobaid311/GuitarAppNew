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
export class UserService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
  }
  constructor(
    private httpClient: HttpClient,
    private httpReqService: HttpRequestService,
    private router: Router
  ) {}

  public login(username: any, password: any) {
    const url = `${APP_CONSTANTS.URI}/v2/tables/login`;
    const requestBody = { username: username, password: password };
    return this.httpClient.post<any[]>(url, requestBody);
  }

  public register(userData: any) {
    const url = `${APP_CONSTANTS.URI}/v2/tables/register`;
    const requestBody = userData;
    return this.httpClient.post<any[]>(url, requestBody);
  }
}
