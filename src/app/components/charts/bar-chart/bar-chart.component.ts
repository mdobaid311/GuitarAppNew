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
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  @Input() barChartData: any;
  @Input() avgChartData: any;
  @Input() brandName: any;
  @Input() interval: any;

  chartOptions: any;

  faThumbtack = faThumbtack;

  newDataArray: any = [];
  subscription: Subscription = new Subscription();

  theme = 'light';
  loader = false;
  pinBarChart: any;

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

    this.chartData.barChartPinToDB.subscribe((pintoDb) => {
      this.pinBarChart = pintoDb;
    });

    this.subscription = this.chartData.dataArray.subscribe((array) => {
      this.newDataArray = array;

      this.chartOptions = {
        chart: {
          type: 'bar',
        },

        title: {
          text: 'Sales',
          style: {
            color: '#000',
            fontFamily: 'Verdana, sans-serif',
          },
        },

        // subtitle: {
        //   text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>'
        // },
        xAxis: {
          type: 'category',
          labels: {
            formatter: function (e: any): any {
              const interval = array.length / 6;
              if (e.isFirst || e.isLast || e.pos % interval === 0)
                return e.value;
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
          showInLegend: false,
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
            color: '#2f7ed8', // Change color of columns
            pointWidth: 25, // Reduce width of columns
            backgroundColor: '#FCFFC5',
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
      .getFullSalesData('2023-01-01 00:00:20', '2023-01-01 23:59:00', 900)
      .subscribe({
        next: (resp: any) => {
          let yearsData: any = [];
          this.barChartData.forEach((item: any) => {
            const itemData = [item.datetime, item.original_order_total_amount];
            yearsData.push(itemData);
          });

          let avgDataSeries = this.avgChartData.map((item: any) => {
            return [item.datetime, item.original_order_total_amount];
          });

          if (this.interval === '1h') {
            // if the same key is present in yeardata than keep it in avgDataSeries or remove it from avgDataSeries

            avgDataSeries = avgDataSeries.filter((item: any) => {
              return yearsData.some((item2: any) => {
                return item[0] === item2[0];
              });
            });
          } else {
            avgDataSeries = null;
          }
          function compareDates(a: any, b: any) {
            const dateA: any = new Date(a[0]);
            const dateB: any = new Date(b[0]);
            return dateA - dateB;
          }

          yearsData = yearsData.sort(compareDates);
          avgDataSeries = avgDataSeries
            ? avgDataSeries.sort(compareDates)
            : null;
          this.chartOptions = {
            chart: {
              type: 'bar',
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
                  if (e.isFirst || e.isLast || e.pos % interval === 0)
                    return e.value;
                  else return '';
                },
                enabled: false,
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
            // legend: {
            //   layout: 'vertical', // changed to vertical layout
            //   align: 'right', // moved to the right
            //   verticalAlign: 'top', // moved to the top
            //   x: -10, // adjust x position to align with chart
            //   reversed: true
            // },
            plotOptions: {
              series: {
                stacking: 'normal',
                dataLabels: {
                  enabled: true,
                },
              },
            },
            series: [
              {
                name: `Sales - ${this.brandName ? this.brandName : ''}`,
                data: yearsData,

                dataLabels: {
                  enabled: true, // Remove data labels from columns
                  color: '#fff',
                },
                color: '#4aa4ff', // Change color of columns
                pointWidth: 25, // Reduce width of columns
                backgroundColor: '#FCFFC5',
              },
              {
                name: `Sales - ${this.brandName ? this.brandName : ''}`,
                data: yearsData,

                dataLabels: {
                  enabled: true, // Remove data labels from columns
                  color: '#fff',
                },
                color: '#393787', // Change color of columns
                pointWidth: 25, // Reduce width of columns
                backgroundColor: '#fff',
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
    this.pinBarChart = true;
    this.chartData.barChartPinToDB.next(this.pinBarChart);
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

// chart: {
//   type: 'bar'
// },
// title: {
//   text: this.options.text
// },
// xAxis: {
//   categories: this.options.categories
// },
// yAxis: {
//   min: 0,
//   title: {
//     text: 'Goals'
//   }
// },
// legend: {
//   layout: 'vertical', // changed to vertical layout
//   align: 'right', // moved to the right
//   verticalAlign: 'top', // moved to the top
//   x: -10, // adjust x position to align with chart
//   reversed: true
// },
// plotOptions: {
//   series: {
//     stacking: 'normal',
//     dataLabels: {
//       enabled: true
//     }
//   }
// },
// series: this.options.series
