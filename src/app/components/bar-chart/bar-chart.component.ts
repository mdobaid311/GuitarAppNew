import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  chartOptions: any;
  @Input() options:any;

  ngOnInit() {

    this.chartOptions = {
      chart: {
        type: 'bar'
      },
      title: {
        text: this.options.text
      },
      xAxis: {
        categories: this.options.categories
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Goals'
        }
      },
      legend: {
        layout: 'vertical', // changed to vertical layout
        align: 'right', // moved to the right
        verticalAlign: 'top', // moved to the top
        x: -10, // adjust x position to align with chart
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      series: this.options.series
    };
  }

  ngAfterViewInit() {
    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }
}
