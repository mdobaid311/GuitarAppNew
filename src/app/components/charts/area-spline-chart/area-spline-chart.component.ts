import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import {
  faCaretLeft,
  faClock,
  faSearch,
  faFileExport,
  faChartLine,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chartData.service';
import { WorkBook, utils, write } from 'xlsx';
import { saveAs } from 'file-saver';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-area-spline-chart',
  templateUrl: './area-spline-chart.component.html',
  styleUrls: ['./area-spline-chart.component.scss'],
})
export class AreaSplineChartComponent {
  chartOptions: any;
  @Input() options: any;

  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  faClock = faClock;
  faSearch = faSearch;
  faCaretLeft = faCaretLeft;
  faFileExport = faFileExport;
  faChartLine = faChartLine;
  faPlay = faPlay;
  intervalsList = [
    { name: '15 Min' },
    { name: '30 Min' },
    { name: '1 Hour' },
    { name: '6 Hour' },
    { name: '1 Day' },
  ];

  constructor(
    private chartData: ChartService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
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

  lineChartData: any[] = [
    ['Mar-30', 12132.49],
    ['01:00', 8684.7],
    ['02:00', 12549.97],
    ['03:00', 1597.91],
    ['04:00', 5560.16],
    ['05:00', 5897.75],
    ['06:00', 32194.69],
    ['07:00', 49965.62],
    ['08:00', 69064.74],
    ['09:00', 97140.46],
    ['10:00', 72345.8],
    ['11:00', 96335.47],
    ['12:00', 130239.86],
    ['13:00', 116503.92],
    ['14:00', 127628.04],
    ['15:00', 62676.81],
    ['16:00', 51011.89],
    ['17:00', 34344.86],
    ['18:00', 53109.91],
    ['19:00', 23870.36],
    ['20:00', 21705.91],
    ['21:00', 29122.41],
    ['22:00', 17602.94],
    ['23:00', 11489.76],
  ];

  createExcelFile(data: any[], fileName: string): void {
    const worksheet: any = utils.json_to_sheet(data);
    const workbook: WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const file: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(file, fileName + '.xlsx');
  }

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
        type: 'spline',
        backgroundColor: this.theme === 'dark' ? '#0C274E' : '#fff',
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
          name: 'Sales',
          data: this.selectedColumnData,

          dataLabels: {
            enabled: true, // Remove data labels from lines
            color: '#fff',
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
    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }

  data: any;
  filteredData: any;

  excelFileName: string = 'order_book_line';

  onTableSelectChange(data: any) {
    this.data = data.data;
    this.excelFileName = data.tableName;
  }

  exportToExcel() {
    console.log('export to excel');
    this.createExcelFile(this.data, this.excelFileName);
  }

  ngOnInit(): void {
    this.chartData.getTableData('order_book_line').subscribe((res: any) => {
      this.data = res;
      this.columns = Object.keys(this.data[0]);
    });

    const lineChartData = this.lineChartData;

    this.chartOptions = {
      chart: {
        type: 'spline',
        backgroundColor: this.theme === 'dark' ? '#0C274E' : '#0C274E',
      },

      title: {
        text: 'Sales',
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
            const interval = Math.round(lineChartData.length / 6);
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
          name: 'Sales',
          data: this.lineChartData,
          lineWidth: 2,
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
    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
    this.updateChartTheme();
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

  queryTextArea: any;

  onQueryChange(e: any) {
    this.queryTextArea = e.target.value;
  }

  originalData: any;
  columnsData: any = [];
  dataSubject: Subject<any> = new Subject<any>();

  columns: any = [];

  getQueryResult() {
    console.log('query', this.queryTextArea);

    this.chartData
      .getCustomQueryData(this.queryTextArea)
      .subscribe((res: any) => {
        this.data = res;
        this.columns = Object.keys(this.data[0]);
        this.changeDetectorRef.markForCheck();
      });
  }

  xAxisColumn = '';
  yAxisColumn = '';

  onColumnChange(type: any, e: any) {
    console.log(e.target.value);
    if (type === 'x') {
      this.xAxisColumn = e.target.value;
    } else {
      this.yAxisColumn = e.target.value;
    }
    // console.log('x', this.xAxisColumn, 'y', this.yAxisColumn);
  }

  showChart = true;

  createChart() {
    // create an array of arrays where each array should have two values (x and y) for the chart
    if (this.xAxisColumn === '' || this.yAxisColumn === '') {
      return;
    }
    // this.showChart = !this.showChart;
    console.log(this.showChart);
    const data = this.data.map((item: any) => {
      return [item[this.xAxisColumn], +item[this.yAxisColumn]];
    });
    console.log(data);
    this.chartOptions.series[0].data = data;
    this.chartOptions.xAxis.labels.formatter = function (e: any): any {
      const interval = Math.round(data.length / 6);
      if (e.isFirst || e.isLast || e.pos % interval === 0) return e.value;
      else return '';
    };
    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }
}
