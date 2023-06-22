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
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  @Input() columnChartData: any;

  chartOptions: any;

  newDataArray: any = [];
  subscription: Subscription = new Subscription();

  theme = 'light';
  loader = false;
  pinColChart: any;

  constructor(private chartData: ChartService) {
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
    this.chartData.colChartPinToDB.subscribe((pintoDb) => {
      this.pinColChart = pintoDb;
    });


    this.subscription = this.chartData.dataArray.subscribe((array) => {

      this.newDataArray = array;

      this.chartOptions = {
        chart: {
          type: 'column',
        },

        title: {
          text: 'Sales',
          style: {
            color: '#000',
            fontFamily: 'Verdana, sans-serif',
          },
        },

        xAxis: {
          type: 'category',
          labels: {
            formatter: function (e: any): any {
              const interval = Math.round(array.length / 6);
              if (e.isFirst || e.isLast || e.pos % interval === 0) return e.value;
              else return '';
            },
            enabled: true,
            rotation: 0,
            style: {
              color: '#0C274E',
              fontSize: '18px',
              fontFamily: 'Poppins, sans-serif',
              width: '40px',
            },
            step: 1,
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Dollars in 1000' + "'" + 's',
          },
          labels: {
            rotation: 0,
            style: {
              // height: '100px',
              color: '#000',
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat: 'Sales: <b>{point.y:.1f} </b>',
        },
        series: [
          {
            name: 'Population',
            data: array,
            dataLabels: {
              enabled: true, // Remove data labels from columns
            },
            color: '#A5D7E8', // Change color of columns
          },
          {
            name: 'Population',
            data: array,
            dataLabels: {
              enabled: true, // Remove data labels from columns
            },
            color: '#2f7ed8', // Change color of columns
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
          this.columnChartData.forEach((item: any) => {
            const itemData = [item.datetime, item.original_order_total_amount];
            yearsData.push(itemData);
          });
          this.chartOptions = {
            chart: {
              type: 'column',
            },

            title: {
              text: 'Sales',
              style: {
                color: '#000',
                fontFamily: 'Verdana, sans-serif',
              },
            },

            xAxis: {
              type: 'category',
              labels: {
                formatter: function (e: any): any {
                  const interval = Math.round(yearsData.length / 6);
                  if (e.isFirst || e.isLast || e.pos % interval === 0) return e.value;
                  else return '';
                },
                enabled: true,
                rotation: 0,
                style: {
                  color: '#0C274E',
                  fontSize: '18px',
                  fontFamily: 'Poppins, sans-serif',
                  width: '40px',
                },
                step: 1,
              },
            },
            // yAxis: {

            //   labels: {
            //     enabled: false,
            //   },
            //   title: {
            //     text: null, // Hide y-axis title
            //   },
            //   axisLabel: {
            //     text: '', // Hide "Values" label
            //   },
            //   min: 0,
            // },
            yAxis: {
              min: 0,
              title: {
                text: 'Dollars in 1000' + "'" + 's',
              },

              labels: {
                rotation: 0,
                style: {
                  // height: '100px',
                  color: '#000',
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif',
                },
              },
            },
            legend: {
              enabled: false,
            },
            tooltip: {
              pointFormat: 'Sales: <b>{point.y:.1f}</b>',
            },
            series: [
              {
                name: 'Population',
                data: yearsData,

                dataLabels: {
                  enabled: true, // Remove data labels from columns
                  color: '#fff',
                },
                color: '#A5D7E8', // Change color of columns
              },
              {
                name: 'Population',
                data: yearsData,

                dataLabels: {
                  enabled: true, // Remove data labels from columns
                  color: '#fff',
                },
                color: '#2f7ed8', // Change color of columns
              },
            ],
            plotOptions: {
              column: {
                events: {
                  click: function (event: any) {
                    const name = +event.point.name;
                    alert('Value of clicked column: ' + name);
                  },
                },
              },
            },
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

    this.chartData.colChartPinToDB.next(this.pinColChart);
  }

  updateChartTheme() {
    this.theme = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';

    this.chartOptions.chart.backgroundColor =
      this.theme === 'dark' ? '#0C274E' : '#fff';
    this.chartOptions.xAxis.labels.style.color =
      this.theme === 'dark' ? '#fff' : '#000';
    this.chartOptions.yAxis.labels.style.color =
      this.theme === 'dark' ? '#fff' : '#000';
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
