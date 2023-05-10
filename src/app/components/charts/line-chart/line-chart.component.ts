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
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

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
    this.chartData.booleanSubject.subscribe((permission) => {
      permission ? (this.loader = true) : null;
    });

    this.chartData.lineChartPinToDB.subscribe((pintoDb) => {
      this.pinLineChart = pintoDb;
    });

    this.subscription = this.chartData.dataArray.subscribe((array) => {
      this.chartOptions = {
        chart: {
          type: 'line',
          height: (9 / 16) * 40 + '%',
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
            rotation: 0,
            style: {
              color: '#000',
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
            },
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
              enabled: true, // Remove data labels from lines
            },
            color: '#A5D7E8', // Change color of lines
          },
          {
            name: 'Population',
            data: this.newDataArray,
            dataLabels: {
              enabled: true, // Remove data labels from lines
            },
            color: '#2f7ed8', // Change color of lines
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

    this.chartData.getOrderTotalYears().subscribe({
      next: (resp) => {
        let yearsData: any = [];
        console.log('Year data', resp);
        resp.forEach((item: IYear) => {
          const itemData = [item.year, item.total];
          yearsData.push(itemData);
        });

        const newData = yearsData.map((item: any) => {
          return item[1] + Math.random() * 100000000;
        });

        this.chartOptions = {
          chart: {
            type: 'line',
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
              rotation: 0,
              style: {
                color: '#000',
                fontFamily: 'Verdana, sans-serif',
              },
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
            pointFormat: 'Sales: <b>{point.y:.1f}</b>',
          },
          series: [
            {
              name: 'Population',
              data: newData,

              dataLabels: {
                enabled: true, // Remove data labels from lines
                color: '#fff',
              },
              color: '#A5D7E8', // Change color of lines
            },
            {
              name: 'Population',
              data: yearsData,

              dataLabels: {
                enabled: true, // Remove data labels from lines
                color: '#fff',
              },
              color: '#2f7ed8', // Change color of lines
            },
          ],
          plotOptions: {
            line: {
              events: {
                click: function (event: any) {
                  const name = +event.point.name;
                  alert('Value of clicked line: ' + name);
                },
              },
            },
          },
        };
        Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
        this.updateChartTheme();
        this.loader = false;
      },
      error: (error) => {},
    });
  }

  onPinToDashboard() {
    console.log('pin to DB_line', this.pinLineChart);
    this.chartData.lineChartPinToDB.next(this.pinLineChart);
  }

  updateChartTheme() {
    this.theme = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';

    this.chartOptions.chart.backgroundColor =
      this.theme === 'dark' ? '#19376D' : '#fff';
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
