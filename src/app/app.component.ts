import { Component } from '@angular/core';
import { ChartService, DataService } from './services/chartData.service';
import { SalesDataService } from './services/sales-data.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONSTANTS } from './constants';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'guitarApp';
  daterange: any;
  constructor(
    private salesData: SalesDataService,
    private chartData: ChartService,
    private httpClient: HttpClient,
    private userService: UserService,
    private _router: Router
  ) {}

  user: any;

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this._router.navigate(['/dashboard']);
    } else {
      this._router.navigate(['/']);
    }
  }
}
