import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  chartOptions: any;
  theme = 'light';

  ngOnInit() {
    this.chartOptions = {
      colors: ['#2f7ed8'],

      chart: {
        type: 'column',
        height: (9 / 16) * 55 + '%', // 16:9 ratio
        backgroundColor: this.theme === 'dark' ? '#0B2447' : '#19376D',
      },
      title: {
        text: 'By Brand',
      },
      subtitle: {
        // text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>'
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: 270,
          style: {
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
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        pointFormat: 'Sales: <b>{point.y:.1f} millions</b>',
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          colorByPoint: true,
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: [
        {
          name: 'Population',
          colorByPoint: false,
          data: [
            ['Tokyo', 37.33],
            ['Delhi', 31.18],
            ['Shanghai', 27.79],
            ['Sao Paulo', 22.23],
            ['Mexico City', 21.91],
            ['Dhaka', 21.74],
            ['Cairo', 21.32],
            ['Beijing', 20.89],
            ['Mumbai', 20.67],
            ['Osaka', 19.11],
            ['Karachi', 16.45],
            ['Chongqing', 16.38],
            ['Istanbul', 15.41],
            ['Buenos Aires', 15.25],
            ['Kolkata', 14.974],
            ['Kinshasa', 14.97],
            ['Lagos', 14.86],
            ['Manila', 14.16],
            ['Tianjin', 13.79],
            ['Guangzhou', 13.64],
            ['Istanbul', 15.41],
            ['Buenos Aires', 15.25],
            ['Kolkata', 14.974],
            ['Kinshasa', 14.97],
            ['Lagos', 14.86],
            ['Manila', 14.16],
            ['Tianjin', 13.79],
            ['Guangzhou', 13.64],
          ],
          dataLabels: {
            enabled: false,
          },

          pointWidth: 20, // Reduce width of columns
        },
      ],
    };
  }

  ngAfterViewInit() {
    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }
}

// column single color

// chart: {
//   type: 'column'
// },
// title: {
//   text: 'Sales'
// },
// // subtitle: {
// //   text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>'
// // },
// xAxis: {
//   type: 'category',
//   labels: {
//     rotation: 0,
//     style: {
//       fontSize: '13px',
//       fontFamily: 'Verdana, sans-serif'
//     }
//   }
// },
// yAxis: {
//   // min: 0,
//   // title: {
//   //   text: 'Population (millions)'
//   // }
//   labels: {
//     enabled: false
//   },
//   title: {
//     text: null // Hide y-axis title
//   },
//   axisLabel: {
//     text: '' // Hide "Values" label
//   },
//   min: 0
// },
// legend: {
//   enabled: false
// },
// tooltip: {
//   pointFormat: 'Sales: <b>{point.y:.1f} millions</b>'
// },
// series: [{
//   name: 'Population',
//   data: [

//     ['12:00', 27.79],
//     ['1:00', 22.23],
//     ['2:00', 21.91],
//     ['3:00', 21.74],
//     ['4:00', 21.32],
//     ['5:00', 20.89],
//     ['6:00', 20.67],
//     ['7:00', 19.11],
//     ['8:00', 16.45],
//     ['9:00', 16.38],
//     ['10:00', 15.41],
//     ['11:00', 15.25],
//     ['12:00', 14.974],
//     ['1:00', 14.970],
//     ['2:00', 14.86],
//     ['3:00', 14.16],
//     ['4:00', 13.79],
//     ['5:00', 13.64],

//   ],
//   dataLabels: {
//     enabled: false // Remove data labels from columns
//     // enabled: true,
//     // rotation: -90,
//     // color: '#FFFFFF',
//     // align: 'right',
//     // format: '{point.y:.1f}', // one decimal
//     // y: 10, // 10 pixels down from the top
//     // style: {
//     //   fontSize: '13px',
//     //   fontFamily: 'Verdana, sans-serif'
//     // }
//   },
//   color: '#b39ddb', // Change color of columns
//   pointWidth: 10 // Reduce width of columns
// }]

// stacked column

// chart: {
//   type: 'column'
// },
// title: {
//   text: 'Major trophies for some English teams',
//   align: 'left'
// },
// xAxis: {
//   categories: ['Arsenal', 'Chelsea', 'Liverpool', 'Manchester United']
// },
// yAxis: {
//   min: 0,
//   title: {
//     text: 'Count trophies'
//   },
//   stackLabels: {
//     enabled: true,
//     style: {
//       fontWeight: 'bold',
//       color: ( // theme
//         Highcharts?.defaultOptions?.title?.style &&
//         Highcharts.defaultOptions.title.style.color
//       ) || 'gray',
//       textOutline: 'none'
//     }
//   }
// },
// legend: {
//   align: 'left',
//   x: 70,
//   verticalAlign: 'top',
//   y: 70,
//   floating: true,
//   backgroundColor:
//     Highcharts?.defaultOptions?.legend?.backgroundColor || 'white',
//   borderColor: '#CCC',
//   borderWidth: 1,
//   shadow: false
// },
// tooltip: {
//   headerFormat: '<b>{point.x}</b><br/>',
//   pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
// },
// plotOptions: {
//   column: {
//     stacking: 'normal',
//     dataLabels: {
//       enabled: true
//     }
//   }
// },
// series: [{
//   name: 'BPL',
//   data: [3, 5, 1, 13]
// }, {
//   name: 'FA Cup',
//   data: [14, 8, 8, 12]
// }, {
//   name: 'CL',
//   data: [0, 2, 6, 3]
// }]
