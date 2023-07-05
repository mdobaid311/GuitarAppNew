import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ChartService } from 'src/app/services/chartData.service';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  @Input() lineChartData: any;
  @Input() avgChartData: any;
  @Input() brandName: any;
  @Input() interval: any;

  chartOptions: any;

  newDataArray: any = [];
  subscription: Subscription = new Subscription();

  theme = 'light';
  loader = false;

  pinLineChart: any;

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
    console.log(this.interval);
    this.loader = true;
    this.chartData.booleanSubject.subscribe((permission) => {
      permission ? (this.loader = true) : null;
    });

    this.chartData.lineChartPinToDB.subscribe((pintoDb) => {
      this.pinLineChart = pintoDb;
    });

    this.subscription = this.chartData.dataArray.subscribe((array) => {

      let avgDataSeries = this.avgChartData.map((item: any) => {
        return [item.datetime, item.original_order_total_amount];
      });

      if (this.interval === '1h') {
        // if the same key is present in yeardata than keep it in avgDataSeries or remove it from avgDataSeries

        avgDataSeries = avgDataSeries.filter((item: any) => {
          return array.some((item2: any) => {
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

      array = array.sort(compareDates);
      avgDataSeries = avgDataSeries
        ? avgDataSeries.sort(compareDates)
        : null;


      this.chartOptions = {
        chart: {
          type: 'line',
          height: (9 / 16) * 40 + '%',
        },

        title: {
          text: `Sales - ${this.brandName ? this.brandName : ''}`,
          style: {
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
          },
        },

        xAxis: {
          type: 'category',
          showLastLabel: true,
          showFirstLabel: true,
          labels: {
            formatter: function (e: any): any {
              const interval = Math.round(array.length / 6);

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
              color: '#fff',
              fontSize: '18px',
              fontFamily: 'Poppins, sans-serif',
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
            marker: {
              enabled: false,
            },
            name: `Sales - ${this.brandName ? this.brandName : ''}`,
            data: array,
            dataLabels: {
              enabled: true, // Remove data labels from lines
            },
            color: '#51FF14', // Change color of lines
          },
          {
            marker: {
              enabled: false,
            },
            name: `Sales - ${this.brandName ? this.brandName : ''}`,
            data: avgDataSeries,
            dataLabels: {
              enabled: true, // Remove data labels from lines
            },
            color: '#51FF14', // Change color of lines
          },
        ],
        plotOptions: {
          line: {
            DashStyleValue: 'dot',
            events: {
              click: function (event: any) {
                const name = +event.point.name;
                alert('Value hello');
              },
            },
          },
        },
      };
      Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 500);
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
    console.log(this.brandName ? this.brandName : '');

    this.chartData
      .getFullSalesDataByRange(
        '2023-03-30 00:00:20',
        '2023-03-30 23:59:00',
        900
      )
      .subscribe({
        next: (resp: any) => {
          let yearsData: any = [];
          this.lineChartData.forEach((item: any) => {
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
              type: 'spline',
            },

            title: {
              text: `Sales - ${this.brandName ? this.brandName : ''}`,
              style: {
                color: '#fff',
                fontFamily: 'Poppins, sans-serif',
              },
            },

            xAxis: {
              startOnTick: true,
              endOnTick: true,
              type: 'category',
              showLastLabel: true,
              showFirstLabel: true,
              labels: {
                formatter: function (e: any): any {
                  const interval = Math.round(yearsData.length / 6);
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
                  color: '#fff',
                  fontSize: '18px',
                  fontFamily: 'Poppins, sans-serif',
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
                marker: {
                  enabled: false,
                },
                name: `Sales - ${this.brandName ? this.brandName : ''}`,
                data: avgDataSeries,
                lineWidth: 4,
                dataLabels: {
                  enabled: false, // Remove data labels from lines
                  color: '#fff',
                  style: {
                    // height: '100px',
                    color: '#fff',
                    fontSize: '14px',
                    fontFamily: 'Poppins, sans-serif',
                  },
                },
                color: '#fff', // Change color of lines
              },
              {
                marker: {
                  enabled: false,
                },
                name: 'Sales',
                data: yearsData,
                lineWidth: 4,
                dataLabels: {
                  enabled: false, // Remove data labels from lines
                  color: '#fff',
                  style: {
                    // height: '100px',
                    color: '#fff',
                    fontSize: '14px',
                    fontFamily: 'Poppins, sans-serif',
                  },
                },
                color: '#51FF14', // Change color of lines
              },
            ],
            plotOptions: {
              line: {
                dashStyle: 'dash',
                events: {
                  click: function (event: any) {
                    const name = +event.point.name;
                    alert('Value of clicked line: ' + name);
                  },
                },
              },
            },
          };
          Highcharts.chart(
            this.chartContainer.nativeElement,
            this.chartOptions
          );
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 500);
          this.updateChartTheme();
          this.loader = false;
        },
      });
  }

  onPinToDashboard() {
    this.chartData.lineChartPinToDB.next(this.pinLineChart);
  }

  updateChartTheme() {
    this.theme = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';

    this.chartOptions.chart.backgroundColor =
      this.theme === 'dark' ? '#0C274E' : '#fff';
    this.chartOptions.xAxis.labels.style.color =
      this.theme === 'dark' ? '#4AA4FF' : '#000';
    (this.chartOptions.xAxis.labels.style.textOverflow = 'allow'),
      (this.chartOptions.xAxis.labels.style.width = 100),
      (this.chartOptions.yAxis.labels.style.color =
        this.theme === 'dark' ? '#fff' : '#000');
    this.chartOptions.title.style.color =
      this.theme === 'dark' ? '#fff' : '#000';

    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }

  ngAfterViewInit() {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

class IYear {
  'year': string;
  'total': number;
}
