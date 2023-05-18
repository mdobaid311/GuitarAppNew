import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChartService } from './chartData.service';

@Injectable({
  providedIn: 'root',
})
export class SalesDataService {
  private salesData = new BehaviorSubject([]);
  currentSalesData = this.salesData.asObservable();

  changeData(data: any) {
    this.salesData.next(data);
  }
}

class IYear {
  'year': string;
  'total': number;
}
