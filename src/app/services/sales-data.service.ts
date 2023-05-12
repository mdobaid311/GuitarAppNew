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

  constructor(chartData: ChartService) {
    chartData.getOrderTotalYears().subscribe({
      next: (resp) => {
        let yearsData: any = [];
        resp.forEach((item: IYear) => {
          const itemData = {
            name: item.year,
            y: item.total,
            sales: Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(item.total),
          };
          yearsData.push(itemData);
        });
        this.changeData(yearsData);
      },
    });
  }
}

class IYear {
  'year': string;
  'total': number;
}
