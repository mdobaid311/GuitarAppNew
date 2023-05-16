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
    this.selectedColumnData = this.data
      .map((row: any) => Math.floor(row[header]))
      .slice(0, 50);

    this.chartOptions = {
      chart: {
        type: 'line',
        backgroundColor: this.theme === 'dark' ? '#0D2039' : '#fff',
      },

      xAxis: {
        type: 'category',
        labels: {
          rotation: 0,
          style: {
            color: '#fff',
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
            color: '#fff',
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
      credits: {
        enabled: false,
      },

      series: [
        {
          name: 'Population',
          data: this.selectedColumnData,

          dataLabels: {
            enabled: true, // Remove data labels from lines
            color: '#fff',
          },
          color: '#A5D7E8', // Change color of lines
        },
        {
          name: 'Population',
          data: this.selectedColumnData,

          dataLabels: {
            enabled: true, // Remove data labels from lines
            color: '#fff',
          },
          color: '#2f7ed8', // Change color of lines
        },
      ],
    };
    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }

  columns: any = [];
  data: any;
  filteredData: any;

  onTableSelectChange(data: any) {
    this.data = data;
    console.log(this.data)
  }

  ngOnInit(): void {
    this.chartData.getTableData('order_book_line').subscribe((res: any) => {
      console.log('order_book_line', res);
      this.data = res;
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
