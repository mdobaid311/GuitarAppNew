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
import { SalesDataService } from 'src/app/services/sales-data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  @Input() pieChartData: any;

  chartOptions: any;

  newDataArray: any = [];
  subscription: Subscription = new Subscription();

  theme = 'light';
  loader = false;

  pinPieChart: any;

  constructor(
    private chartData: ChartService,
    private salesData: SalesDataService
  ) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.target === document.body &&
          mutation.attributeName === 'class'
        ) {
          this.updateChartTheme();
        }
      });
    });
    observer.observe(document.body, { attributes: true });
  }

  ngOnInit() {
    this.chartData.booleanSubject.subscribe((permission) => {
      permission ? (this.loader = true) : null;
    });

    this.chartData.pieChartPinToDB.subscribe((pintoDb) => {
      this.pinPieChart = pintoDb;
    });

    this.subscription = this.salesData.currentSalesData.subscribe((array) => {

      this.newDataArray = array;
      let pieDataArray: any = [];
      array.forEach((item) => {
        const element = {
          name: item[0],
          y: item[1],
        };
        pieDataArray.push(element);
      });
      this.chartOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        title: {
          text: 'Sales',
          align: 'left',
          style: {
            color: '#000',
            fontFamily: 'Verdana, sans-serif',
          },
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            },
          },
        },
        series: [
          {
            name: 'Sales',
            colorByPoint: true,
            data: pieDataArray,
          },
        ],
      };
      Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
      this.updateChartTheme();
      this.loader = false;
    });
    this.chartData.booleanSubject.subscribe((permission) => {
      permission ? null : this.loadInitialchart();
    });
    this.loadInitialchart();
  }

  loadInitialchart() {
    this.chartData.booleanSubject.subscribe((permission) => {
      permission ? null : (this.loader = true);
    });
    this.chartData
      .getFullSalesData('2023-01-01 00:00:20', '2023-01-01 23:59:00',900)
      .subscribe({
        next: (resp: any) => {
          let yearsData: any = [];
          this.pieChartData.forEach((item: any) => {
            const itemData = [item.datetime, item.original_order_total_amount];
            yearsData.push(itemData);
          });
          this.chartOptions = {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
            },
            title: {
              text: 'Sales',
              align: 'left',
              style: {
                color: '#000',
                fontFamily: 'Verdana, sans-serif',
              },
            },
            tooltip: {
              pointFormat: 'Sales: <b>{point.sales} </b> ',
            },
            accessibility: {
              point: {
                valueSuffix: '%',
              },
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                },
              },
            },
            series: [
              {
                name: 'Sales',
                colorByPoint: true,
                data: yearsData,
              },
            ],
          };
          Highcharts.chart(
            this.chartContainer.nativeElement,
            this.chartOptions
          );
          this.updateChartTheme();
          this.loader = false;
        },
        error: (error) => {},
      });
  }

  onPinToDashboard() {

    this.chartData.pieChartPinToDB.next(this.pinPieChart);
  }

  updateChartTheme() {
    this.theme = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';

    this.chartOptions.chart.backgroundColor =
      this.theme === 'dark' ? '#0C274E' : '#fff';
    // this.chartOptions.xAxis.labels.style.color =
    //   this.theme === 'dark' ? '#fff' : '#000';
    //   this.chartOptions.yAxis.labels.style.color =
    //   this.theme === 'dark' ? '#fff' : '#000';
    this.chartOptions.title.style.color =
      this.theme === 'dark' ? '#fff' : '#000';

    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
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
