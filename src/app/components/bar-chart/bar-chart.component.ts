import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  chartOptions: any;
  @Input() options: any;

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'column',
        height: (9 / 16) * 55 + '%',

      },

      title: {
        text: 'Sales',
      },
      // subtitle: {
      //   text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>'
      // },
      xAxis: {
        type: 'category',
        labels: {
          rotation: 0,
          style: {
            // height: '100px',
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
      yAxis: {
        // min: 0,
        // title: {
        //   text: 'Population (millions)'
        // }
        labels: {
          enabled: false,
        },
        title: {
          text: null, // Hide y-axis title
        },
        axisLabel: {
          text: '', // Hide "Values" label
        },
        min: 0,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        pointFormat: 'Sales: <b>{point.y:.1f} millions</b>',
      },
      series: [
        {
          name: 'Population',
          data: [
            ['12:00', 27.79],
            ['1:00', 22.23],
            ['2:00', 21.91],
            ['3:00', 21.74],
            ['4:00', 21.32],
            ['5:00', 20.89],
            ['6:00', 20.67],
            ['7:00', 19.11],
            ['8:00', 16.45],
            ['9:00', 16.38],
            ['10:00', 15.41],
            ['11:00', 15.25],
            ['12:00', 14.974],
            ['1:00', 14.97],
            ['2:00', 14.86],
            ['3:00', 14.16],
            ['4:00', 13.79],
            ['5:00', 13.64],
          ],
          dataLabels: {
            enabled: false, // Remove data labels from columns
            // enabled: true,
            // rotation: -90,
            // color: '#FFFFFF',
            // align: 'right',
            // format: '{point.y:.1f}', // one decimal
            // y: 10, // 10 pixels down from the top
            // style: {
            //   fontSize: '13px',
            //   fontFamily: 'Verdana, sans-serif'
            // }
          },
          color: '#2f7ed8', // Change color of columns
          pointWidth: 25, // Reduce width of columns
        },
      ],
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
    };
  }

  ngAfterViewInit() {
    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }
}
