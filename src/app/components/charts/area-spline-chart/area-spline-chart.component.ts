import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import {
  faCaretLeft,
  faClock,
  faSearch,
  faFileExport,
  faChartLine,
  faPlay,
  faTimes,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chartData.service';
import { WorkBook, utils, write } from 'xlsx';
import { saveAs } from 'file-saver';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

@Component({
  selector: 'app-area-spline-chart',
  templateUrl: './area-spline-chart.component.html',
  styleUrls: ['./area-spline-chart.component.scss'],
})
export class AreaSplineChartComponent {
  chartOptions: any;
  @Input() options: any;
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  faClock = faClock;
  faSearch = faSearch;
  faCaretLeft = faCaretLeft;
  faFileExport = faFileExport;
  faChartLine = faChartLine;
  faTimes = faTimes;
  faEllipsisVertical = faEllipsisVertical;

  faPlay = faPlay;
  intervalsList = [
    { name: '15 Min' },
    { name: '30 Min' },
    { name: '1 Hour' },
    { name: '6 Hour' },
    { name: '1 Day' },
  ];

  theme = 'light';
  selectedColumnData: any[] = [];
  selectedColumnHeader: string = '';
  data: any;
  filteredData: any;

  excelFileName: string = 'order_book_line';

  queryTextArea: any;

  originalData: any;
  columnsData: any = [];
  dataSubject: Subject<any> = new Subject<any>();

  columns: any = [];

  queryError: boolean = false;

  xAxisColumn: any = '';
  yAxisColumn: any = '';
  showChart = false;
  showSaveQuery = false;
  user: any;
  userQueriesData: any;
  queryName: any;
  showSavedQueriesContainer: boolean = false;
  showScheduleQueryContainer: boolean = false;

  scheduledQuery: any;
  email: any;

  schedulingQuery: any;

  globalFromDate: NgbDate | any;
  globalToDate: NgbDate | any;

  todaysDate = moment(new Date()).format('YYYY-MM-DD');
  fullDate: any = moment(new Date()).format('YYYY-MM-DD');

  startDate: any = '2023-05-04 00:00:00';
  endDate: any = '2023-05-05 23:59:59';

  currentSelectedTable: any = 'order_book_line';

  isAnalysisOptionsContainerOpen: any = false;

  constructor(
    private chartData: ChartService,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private toastr: ToastrService,
    private elementRef: ElementRef
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

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isAnalysisOptionsContainerOpen = false;
    }
  }

  lineChartData: any

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

  onTableSelectChange(data: any) {
    this.currentSelectedTable = data.tableName;
    this.data = data.data;
    this.excelFileName = data.tableName;
  }

  exportToExcel() {
    this.createExcelFile(this.data, this.excelFileName);
  }

  ngOnInit(): void {
    this.user = this.userService.user$.subscribe((res: any) => {
      this.user = res;
    });

    this.userService.getUserConfigurationData(69).subscribe((res: any) => {
      this.userQueriesData = res.queriesData;
    });

    this.chartData
      .getTableData(this.currentSelectedTable, this.startDate, this.endDate)
      .subscribe((res: any) => {
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

  onQueryChange(e: any) {
    this.queryTextArea = e.target.value;
  }

  getQueryResult() {
    this.chartData
      .getCustomQueryData(this.queryTextArea, this.startDate, this.endDate)
      .subscribe(
        (res: any) => {
          this.showSaveQuery = true;
          if (Object.keys(res[0]).length === 1) {
            this.queryError = true;
            this.toastr.warning('Single column cannot be plotted');
            this.showSaveQuery = false;
            return;
          }
          this.queryError = false;
          this.data = res;
          this.columns = Object.keys(this.data[0]);
          this.changeDetectorRef.markForCheck();
        },
        (error: any) => {
          console.error('An error occurred:', error.error);
          this.queryError = true;
          this.toastr.error(error.error);
        }
      );
  }

  onColumnChange(type: any, e: any) {
    this.queryError = false;
    if (
      this.xAxisColumn === e.target.value ||
      this.yAxisColumn === e.target.value
    ) {
      this.queryError = true;
      this.toastr.error('Column already selected');
      return;
    }
    this.queryError = false;
    if (type === 'x') {
      this.xAxisColumn = e.target.value;
      this.queryError = false;
    } else {
      this.yAxisColumn = e.target.value;
      this.queryError = false;
    }
  }

  createChart() {
    // create an array of arrays where each array should have two values (x and y) for the chart
    if (this.xAxisColumn === '' || this.yAxisColumn === '') {
      this.queryError = true;
      this.toastr.error('Please select x and y axis');
      return;
    }
    this.showChart = true;
    const data = this.data.map((item: any) => {
      return [item[this.xAxisColumn], +item[this.yAxisColumn]];
    });
    this.chartOptions.series[0].data = data;
    this.chartOptions.xAxis.labels.formatter = function (e: any): any {
      const interval = Math.round(data.length / 6);
      if (e.isFirst || e.isLast || e.pos % interval === 0) return e.value;
      else return '';
    };
    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }

  onQueryNameChange(e: any) {
    this.queryName = e.target.value;
  }

  saveQuery() {
    const userid = this.user?.id;
    const query = this.queryTextArea;
    const queryName = this.queryName;
    const xaxis = this.xAxisColumn;
    const yaxis = this.yAxisColumn;

    if(!xaxis || !yaxis) {
      this.toastr.error('Please select x and y axis columns');
      return;
    }

    if (!queryName || !query || !xaxis || !yaxis) {
      this.toastr.error('Please fill all the fields');
      return;
    }
    const data = {
      userid,
      queryVal: query,
      name: queryName,
      xaxis,
      yaxis,
    };
    this.userService.saveQuery(data).subscribe((res: any) => {
      this.userQueriesData.push({
        query: query,
        name: queryName,
      });
      this.toastr.success('Query Saved Successfully');
    });
  }

  toggleSavedQueriesContainer() {
    this.showSavedQueriesContainer = !this.showSavedQueriesContainer;
  }

  onSavedQueryRun(query: any) {
    this.queryTextArea = query.query;
    this.getQueryResult();
  }

  toggleScheduleQueryContainer() {
    this.showScheduleQueryContainer = !this.showScheduleQueryContainer;
  }

  openQueryScheduleContainer(query: any) {
    this.scheduledQuery = query.query;
    this.showScheduleQueryContainer = true;
  }

  onSavedQuerySchedule() {
    const data = {
      query: this.scheduledQuery,
      toList: this.email,
      time: 12,
    };

    this.userService.scheduleQuery(data).subscribe((res: any) => {});
    this.toastr.success('Query Scheduled Successfully');
    this.showScheduleQueryContainer = false;
  }

  onEmailChange(e: any) {
    this.email = e.target.value;
  }

  onGlobalDateRangeChanged(date: NgbDate) {
    if (!this.globalFromDate && !this.globalToDate) {
      this.globalFromDate = date;
    } else if (
      this.globalFromDate &&
      !this.globalToDate &&
      date.after(this.globalFromDate)
    ) {
      this.globalToDate = date;
    } else {
      this.globalToDate = null;
      this.globalFromDate = date;
    }

    const beginDate =
      this.globalFromDate.year +
      '-' +
      this.globalFromDate.month +
      '-' +
      this.globalFromDate.day;
    const endDate = this.globalToDate
      ? this.globalToDate.year +
        '-' +
        this.globalToDate.month +
        '-' +
        this.globalToDate.day
      : null;
    if (beginDate && endDate) {
      this.fullDate = beginDate + ' to ' + endDate;
      this.startDate = beginDate + ' 00:00:00';
      this.endDate = endDate + ' 23:59:59';
      if (this.queryTextArea) {
        this.getQueryResult();
      } else {
        this.chartData
          .getTableData(this.currentSelectedTable, this.startDate, this.endDate)
          .subscribe((res: any) => {
            this.data = res;
            this.columns = Object.keys(this.data[0]);
          });
      }
    }
  }

  onRangeSelect(range: any) {
    if (range === '1m') {
      this.startDate = moment('2023-05-01 16:28:21')
        .subtract(1, 'months')
        .format('YYYY-MM-DD HH:mm');
      this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
    } else if (
      range === '2h' ||
      range === '6h' ||
      range === '12h' ||
      range === '1d'
    ) {
      if (range === '2h') {
        this.startDate = moment('2023-05-01 16:28:21')
          .subtract(2, 'hours')
          .format('YYYY-MM-DD HH:mm');
        this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 2 hours';
      } else if (range === '6h') {
        this.startDate = moment('2023-05-01 16:28:21')
          .subtract(6, 'hours')
          .format('YYYY-MM-DD HH:mm');
        this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 6 hours';
      } else if (range === '12h') {
        this.startDate = moment('2023-05-01 16:28:21')
          .subtract(12, 'hours')
          .format('YYYY-MM-DD HH:mm');
        this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 12 hours';
      } else if (range === '1d') {
        this.startDate = moment('2023-05-01 16:28:21')
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm');
        this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 24 hours';
      }
    } else if (range === '6m') {
      this.startDate = moment('2023-05-01 16:28:21')
        .subtract(6, 'months')
        .format('YYYY-MM-DD HH:mm');
      this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      this.fullDate = 'Last 6 months';
    } else if (range === '1y') {
      this.startDate = moment('2023-05-01 16:28:21')
        .subtract(12, 'months')
        .format('YYYY-MM-DD HH:mm');
      this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      this.fullDate = 'Last 12 months';
    }
    if (this.queryTextArea) {
      this.getQueryResult();
    } else {
      this.chartData
        .getTableData(this.currentSelectedTable, this.startDate, this.endDate)
        .subscribe((res: any) => {
          this.data = res;
          this.columns = Object.keys(this.data[0]);
        });
    }
  }

  toggleAnalysisOptionsContainer() {
    this.isAnalysisOptionsContainerOpen = !this.isAnalysisOptionsContainerOpen;
  }
  showQueryWindow: boolean = false;

  toggleQueryWindow() {
    this.showQueryWindow = !this.showQueryWindow;
  }

  onColumnHeaderClick(column: any) {
    if (this.xAxisColumn === column) {
      this.xAxisColumn = null;
    } else if (this.yAxisColumn === column) {
      this.yAxisColumn = null;
    } else if (!this.xAxisColumn) {
      this.xAxisColumn = column;
    } else if (!this.yAxisColumn) {
      this.yAxisColumn = column;
    } else {
      this.yAxisColumn = column;
    }
    if (this.xAxisColumn && this.yAxisColumn) {
      this.createChart();
    }
  }
}
