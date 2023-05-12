import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  faCaretLeft,
  faClock,
  faEllipsisVertical,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chartData.service';

@Component({
  selector: 'app-area-spline-chart',
  templateUrl: './area-spline-chart.component.html',
  styleUrls: ['./area-spline-chart.component.scss'],
})
export class AreaSplineChartComponent {
  chartOptions: any;
  @Input() options: any;

  faClock = faClock;
  faSearch = faSearch;
  faCaretLeft = faCaretLeft;

  intervalsList = [
    { name: '15 Min' },
    { name: '30 Min' },
    { name: '1 Hour' },
    { name: '6 Hour' },
    { name: '1 Day' },
  ];

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

  theme = 'light';

  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  // data = [
  //   { id: 21000, name: 25500, age: 25678, custom: 23456, data: 345566 },
  //   { id: 22500, name: 24000, age: 30899, custom: 26456, data: 325566 },
  //   { id: 23456, name: 23000, age: 40567, custom: 23456, data: 345566 },
  //   { id: 21000, name: 25500, age: 25678, custom: 25456, data: 335566 },
  //   { id: 22500, name: 24000, age: 30899, custom: 24456, data: 345566 },
  //   { id: 22500, name: 24000, age: 30899, custom: 24456, data: 345566 },
  //   { id: 22500, name: 24000, age: 30899, custom: 24456, data: 345566 },
  //   { id: 22500, name: 24000, age: 30899, custom: 24456, data: 345566 },
  //   { id: 22500, name: 24000, age: 30899, custom: 24456, data: 345566 },
  //   { id: 22500, name: 24000, age: 30899, custom: 24456, data: 345566 },
  // ];

  selectedColumnData: any[] = [];
  selectedColumnHeader: string = '';

  onColumnHeaderClick(header: string) {
    console.log('header', header);
    this.selectedColumnHeader = header;
    this.selectedColumnData = this.data.map((row: any) => row[header]);
    this.chartOptions = {
      chart: {
        type: 'areaspline',
        backgroundColor: this.theme === 'dark' ? '#0D2039' : '#fff',
      },
      title: {
        text: 'Demo chart',
        align: 'left',
        style: {
          color: this.theme === 'dark' ? '#fff' : '#000',
          fontFamily: 'Verdana, sans-serif',
        },
      },
      subtitle: {
        text: 'Source: <a href="https://www.ssb.no/jord-skog-jakt-og-fiskeri/jakt" target="_blank">SSB</a>',
        align: 'left',
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 120,
        y: 50,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts?.defaultOptions?.legend?.backgroundColor || '#FFFFFF',
      },
      xAxis: {
        plotBands: [
          {
            // Highlight the two last years
            from: 2019,
            to: 2020,
            color: 'rgba(68, 170, 213, .2)',
          },
        ],
        labels: {
          rotation: 0,
          style: {
            color: this.theme === 'dark' ? '#fff' : '#000',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
      yAxis: {
        title: {
          text: 'Quantity',
        },
        labels: {
          rotation: 0,
          style: {
            color: this.theme === 'dark' ? '#fff' : '#000',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
      tooltip: {
        shared: true,
        headerFormat: '<b>Hunting season starting autumn {point.x}</b><br>',
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          pointStart: 2000,
        },
        areaspline: {
          fillOpacity: 0.5,
        },
      },
      series: [
        {
          name: 'Moose',
          data: this.selectedColumnData,
        },
        {
          name: 'Deer',
          data: this.selectedColumnData.map((item, i) => item - 5000 * (i + 1)),
        },
      ],
    };
    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }

  columns: any = [];
  data: any = [];
  filteredData = this.data;

  ngOnInit(): void {
    this.chartData.getFullSalesData().subscribe((res: any) => {
      this.columns = Object.keys(res.series[0]);
      const salesDataArray = res.series.map((row: any) => {
        return Object.values(row);
      });
      this.data = salesDataArray;
      this.filteredData = salesDataArray;
    });
  }

  updateChartTheme() {
    this.theme = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';

    this.chartOptions.chart.backgroundColor =
      this.theme === 'dark' ? '#0D2039' : '#fff';
    // this.chartOptions.series[0].color =
    //   this.theme === 'dark' ? '#FFFFFF' : '#2f7ed8';
    // this.chartOptions.series[0].backgroundColor =
    //   this.theme === 'dark' ? '#3E3E3E' : '#FCFFC5';
    this.chartOptions.xAxis.labels.style.color =
      this.theme === 'dark' ? '#fff' : '#000';
    this.chartOptions.title.style.color =
      this.theme === 'dark' ? '#fff' : '#000';

    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }

  // ngAfterViewInit() {
  //   Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  // }
}
