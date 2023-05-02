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
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  chartOptions: any;

  newDataArray: any = [];
  subscription: Subscription = new Subscription();

  theme = 'light';
  loader = false;

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
<<<<<<< HEAD
    this.subscription = this.chartData.dataArray.subscribe((array) => {
      this.newDataArray = array;

      this.newDataArray = array.map(item=>{
        return {
          name: item[0],
          y: item[1],
          sales: Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(item[1]),
        };
      })

=======

    this.chartData.booleanSubject.subscribe(permission => {
      permission ? this.loader = true :  null;
    })

    this.subscription = this.chartData.dataArray.subscribe(array => {
      console.log('Array', array)
      this.newDataArray = array;
      let pieDataArray:any = [];
      array.forEach(item => {
        const element = {
          name: item[0],
          y: item[1]
        }
        pieDataArray.push(element);
      })
>>>>>>> c47bbed03688d7f855b23383371154da9998029a
      this.chartOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
<<<<<<< HEAD
          type: 'pie',
=======
          type: 'pie'
>>>>>>> c47bbed03688d7f855b23383371154da9998029a
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
<<<<<<< HEAD
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
            data: this.newDataArray,
          },
        ],
      };
      Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
      this.updateChartTheme();
    });
    this.loadInitialchart();
=======
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: pieDataArray
        }]
      };
      Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
      this.updateChartTheme();
      this.loader = false;
    })
    this.chartData.booleanSubject.subscribe(permission => {
      permission ? null :  this.loadInitialchart()
    })
>>>>>>> c47bbed03688d7f855b23383371154da9998029a
  }

  loadInitialchart() {
      this.chartData.booleanSubject.subscribe(permission => {
      permission ?  null :  this.loader = true;
    })
    this.chartData.getOrderTotalYears().subscribe({
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
        Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
        this.updateChartTheme();
        this.loader = false;
      },
      error: (error) => {},
    });
  }

  updateChartTheme() {
    this.theme = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';

    this.chartOptions.chart.backgroundColor =
      this.theme === 'dark' ? '#19376D' : '#fff';
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
