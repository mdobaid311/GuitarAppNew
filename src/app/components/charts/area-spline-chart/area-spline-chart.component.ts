import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  faCaretLeft,
  faClock,
  faSearch,
  faFileExport,
} from '@fortawesome/free-solid-svg-icons';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chartData.service';
import { WorkBook, utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

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
  faFileExport = faFileExport;

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
        type: 'line',
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

  excelFileName: string = 'order_book_line';

  onTableSelectChange(data: any) {
    this.data = data.data;
    this.excelFileName = data.tableName;
  }

  exportToExcel() {
    console.log("export to excel")
    this.createExcelFile(this.data, this.excelFileName);
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
      this.theme === 'dark' ? '#0C274E' : '#fff';
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
