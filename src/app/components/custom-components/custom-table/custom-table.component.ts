import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chartData.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  @Input() customTableData: any;
  chartOptions: any;

  newDataArray: any = [];
  subscription: Subscription = new Subscription();

  theme = 'light';
  loader = false;

  data: any;
  columns: any;

  constructor(private chartData: ChartService) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.target === document.body &&
          mutation.attributeName === 'class'
        ) {
        }
      });
    });
    observer.observe(document.body, { attributes: true });
  }
  ngOnInit() {
    // console.log(this.customTableData);
    this.columns = Object.keys(this.customTableData[0]);
    this.data = this.customTableData;
    this.data = this.customTableData.map((item: any) => {
      return Object.values(item);
    });
    console.log(this.data)
    console.log(this.columns);
    // this.chartData.booleanSubject.subscribe((permission) => {
    //   permission ? (this.loader = true) : null;
    // });

    // this.subscription = this.chartData.dataArray.subscribe((array) => {
    //   this.newDataArray = array.map((item: any) => {
    //     const element = {
    //       period: item[0],
    //       total: item[1],
    //     };
    //     return element;
    //   });

    //   this.data = this.newDataArray;
    //   this.loader = false;
    // });
    // this.chartData.booleanSubject.subscribe((permission) => {
    //   permission ? null : this.loadInitialchart();
    // });
    // this.loadInitialchart();
  }

  loadInitialchart() {
    this.chartData.booleanSubject.subscribe((permission) => {
      permission ? null : (this.loader = true);
    });
    this.chartData.getOrderTotalYears().subscribe({
      next: (resp) => {
        this.data = resp.map((item: any) => {
          const element = {
            period: item.year,
            total: item.total,
          };
          return element;
        });
        this.loader = false;
      },
      error: (error) => {},
    });
  }

  ngAfterViewInit() {
    // Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

class IYear {
  'year': string;
  'total': number;
}
