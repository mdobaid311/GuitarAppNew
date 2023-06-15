import {
  Component,
  ViewChild,
  Renderer2,
  HostListener,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import * as moment from 'moment';
import { ChartService } from 'src/app/services/chartData.service';
import {
  faCalendar,
  faChartLine,
  faAngleDown,
  faChartPie,
  faChartBar,
  faChartColumn,
  faTable,
  faEllipsisVertical,
  faLineChart,
  faThumbtack,
  faExpand,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sales2',
  templateUrl: './sales2.component.html',
  styleUrls: ['./sales2.component.scss'],
})
export class Sales2Component {
  @ViewChild('selectChartType') selectChartType: any;
  @ViewChild('selectButton') selectButton: any;

  originalOrdersTotalToday: any;
  originalOrdersTotalTodayAbbr: any;
  currentRange: any;

  faCalendar = faCalendar;
  faChartLine = faChartLine;
  faAngleDown = faAngleDown;
  faChartPie = faChartPie;
  faChartBar = faChartBar;
  faChartColumn = faChartColumn;
  faLineChart = faLineChart;
  faTable = faTable;
  faEllipsisVertical = faEllipsisVertical;
  faThumbtack = faThumbtack;
  faExpand = faExpand;
  faTimes = faTimes;

  yearData: any = [];
  dataRows = [];

  loader = false;

  showExpandedChartModal = false;
  selectCompareYear: any;

  todaysDate = moment(new Date()).format('YYYY-MM-DD');
  fullDate: any = moment(new Date()).format('YYYY-MM-DD');

  customGoal = 860347;
  customGoalAbbr = Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(this.customGoal);
  customGoalProgress: any;

  isEditable: boolean = false;

  isViewSelectContainerOpen = false;

  toggleViewSelectContainer() {
    this.isViewSelectContainerOpen = !this.isViewSelectContainerOpen;
  }

  expandChart = false;
  onExpandChart() {
    this.expandChart = !this.expandChart;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }

  selectedChart = 'line';

  activeTab: any = 'byType';

  activeBrandTab: any = {
    GC: 'chart',
    MF: 'chart',
  };

  changeActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  changeActiveBrandTab(tabName: string, brand: string) {
    this.activeBrandTab[brand] = tabName;
  }

  chartTypeOptions = [
    { name: 'column', icon: faChartColumn },
    { name: 'line', icon: faLineChart },
    { name: 'bar', icon: faChartBar },
    { name: 'pie', icon: faChartPie },
    { name: 'table', icon: faTable },
  ];

  myDpOptions: IAngularMyDpOptions = {
    dateRange: true,
    dateFormat: 'dd.mm.yyyy',
    // other options are here...
    appendSelectorToBody: true,
    markCurrentDay: true,
    stylesData: {
      selector: 'dp1',
      styles: `
        .dp1 .myDpIconLeftArrow,
        .dp1 .myDpIconRightArrow,
        .dp1 .myDpHeaderBtn {
          color: #fff;
        }
        .dp1 .myDpHeaderBtn:focus,
        .dp1 .myDpMonthLabel:focus,
        .dp1 .myDpYearLabel:focus {
          color: #66afe9;
        }
        .dp1 .myDpDaycell:focus,
        .dp1 .myDpMonthcell:focus,
        .dp1 .myDpYearcell:focus {
          box-shadow: inset 0 0 0 1px #66afe9;
        }
        .dp1 .myDpSelector:focus {
          box-shadow: -1px 1px 6px 0px #ADD8E6;
        }
        .dp1 .myDpSelectorArrow:after {
          border-color: rgba(108, 117, 125, 0);
          border-bottom-color: #0C274E;
        }
        .dp1 .myDpSelectorArrow:focus:before {
          border-bottom-color: #ADD8E6;
        }
        .dp1 .myDpCurrMonth,
        .dp1 .myDpMonthcell,
        .dp1 .myDpYearcell {
          color: #fff;
          font-weight: bold;
        }
        .dp1 .myDpDaycellWeekNbr {
          color: #fff;
          background-color: #0C274E;
        }
        .dp1 .myDpPrevMonth,
        .dp1 .myDpNextMonth {
          color: #bbb;
        }
        .dp1 .myDpWeekDayTitle {
          background-color: #0C274E;
          color: #fff;
          font-weight: bold;
        }
        .dp1 .myDpHeaderBtnEnabled:hover,
        .dp1 .myDpMonthLabel:hover,
        .dp1 .myDpYearLabel:hover,
        .dp1 .myDpFooterBtn:hover {
          color: #fff;
        }
        .dp1 .myDpMarkCurrDay,
        .dp1 .myDpMarkCurrMonth,
        .dp1 .myDpMarkCurrYear {
          border-bottom: 2px solid #fff;
        }
        .dp1 .myDpTableSingleDay:hover,
        .dp1 .myDpTableSingleMonth:hover,
        .dp1 .myDpTableSingleYear:hover {
          background-color: #fff;
          color: #000;
          font-weight: bold;
        }
        .dp1 .myDpDaycell,
        .dp1 .myDpMonthcell,
        .dp1 .myDpYearcell {
          background-color: #0C274E;
        }
        .dp1 .myDpRangeColor {
          background-color: #0B2447;
          color: #fff;
        }
        .dp1 .myDpSelectedDay,
        .dp1 .myDpSelectedMonth,
        .dp1 .myDpSelectedYear {
          background-color: #aaa;
          color: #fff;
          font-weight: bold;
          box-shadow: inset 0 0 0 1px #fff;
        }
        .dp1 .myDpSelector,
        .dp1 .myDpMonthYearSelBar,
        .dp1 .myDpFooterBar {
          background-color: #0C274E;
        }
        .dp1 .myDpDisabled {
          color: #fff;
          background: repeating-linear-gradient(-45deg, #0C274E 7px, #d3d3d3 8px, transparent 7px, transparent 14px);
        }
        .dp1 .myDpHighlight {
          color: 	#e7131a;
        }
       `,
    },
  };

  globalFromDate: NgbDate;
  globalToDate: NgbDate | null = null;

  dayList = [];
  hourList = [];
  monthList = [];

  makeEditable() {
    this.isEditable = true;
  }

  constructor(
    private chartData: ChartService,
    private cdr: ChangeDetectorRef,

    calendar: NgbCalendar
  ) {
    this.globalFromDate = calendar.getToday();
    this.globalToDate = calendar.getToday();
  }

  pinBarChart: any;
  pinLineChart: any;
  pinPieChart: any;
  pinTableChart: any;
  pinColumnChart: any;
  pinActive: any = false;

  onPinToDashboard() {
    if (this.selectedChart === 'bar') {
      this.pinActive = !this.pinActive;
      this.chartData.barChartPinToDB.next(this.pinActive);
    } else if (this.selectedChart === 'line') {
      this.pinActive = !this.pinActive;
      this.chartData.lineChartPinToDB.next(this.pinActive);
    } else if (this.selectedChart === 'pie') {
      this.pinActive = !this.pinActive;
      this.chartData.pieChartPinToDB.next(this.pinActive);
    }
  }

  changeDate(value: any) {
    if (value === 'prev') {
      this.fullDate = moment(this.fullDate)
        .subtract(1, 'days')
        .format('YYYY-MM-DD');

      this.getAllData(this.fullDate);
    } else if (value === 'next') {
      this.fullDate = moment(this.fullDate).add(1, 'days').format('YYYY-MM-DD');
      this.getAllData(this.fullDate);
    }
  }

  compareValue: any = {
    MF: 0,
    GC: 0,
  };
  customGoalProgressPercent: any = {
    MF: 0,
    GC: 0,
  };

  onDateChanged(event: IMyDateModel) {
    const begin = event.dateRange?.beginDate;
    const end = event.dateRange?.endDate;

    this.loader = true;

    const beginDate = begin
      ? begin.year + '-' + begin.month + '-' + begin.day
      : null;
    const endDate = end ? end.year + '-' + end.month + '-' + end.day : null;

    this.chartData
      .getFullSalesDataByRange(beginDate, endDate, 1440 * 60)
      .subscribe({
        next: (resp: any) => {
          const data: any = Object.values(resp);

          this.compareValue = {
            MF: data[0].totalStats.original_order_total_amount,
            GC: data[1].totalStats.original_order_total_amount,
          };

          this.customGoalProgressPercent = {
            MF:
              (data[0].totalStats.original_order_total_amount /
                this.fullSalesData[0].totalStats.original_order_total_amount) *
              100,
            GC:
              (data[1].totalStats.original_order_total_amount /
                this.fullSalesData[1].totalStats.original_order_total_amount) *
              100,
          };

          console.log(this.customGoalProgressPercent);

          this.cdr.detectChanges();
        },
      });
    this.loader = false;
  }

  onRangeSelect(range: any) {
    console.log('Range Selected', range);
    this.chartData.selectedRange.next(range);
    this.chartData.booleanSubject.next(true);
    this.loader = true;

    this.currentRange = range;
    this.chartData.selectedRange.next(range);

    if (range === '1m') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(1, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      this.chartData
        .getFullSalesDataByRange(startDate, endDate, 1440 * 60)
        .subscribe({
          next: (resp: any) => {
            console.log('ABC', Object.values(resp));
            this.fullSalesData = Object.values(resp);
          },
        });
      this.fullDate = 'Last 1 Month';
    } else if (range === '2h' || range === '6h') {
      let startDate = '';
      let endDate = '';
      if (range === '2h') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(2, 'hours')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 2 Hours';
      } else if (range === '6h') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(6, 'hours')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 6 Hours';
      }
      this.chartData
        .getFullSalesDataByRange(startDate, endDate, 15 * 60)
        .subscribe({
          next: (resp: any) => {
            console.log('ABC', Object.values(resp));
            this.fullSalesData = Object.values(resp);
          },
        });
    } else if (range === '12h' || range === '1d') {
      let startDate = '';
      let endDate = '';
      if (range === '12h') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(12, 'hours')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 12 Hours';
      } else if (range === '1d') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 24 Hours';
      }
      this.chartData
        .getFullSalesDataByRange(startDate, endDate, 60 * 60)
        .subscribe({
          next: (resp: any) => {
            console.log('ABC', Object.values(resp));
            this.fullSalesData = Object.values(resp);
          },
        });
    } else if (range === '6m') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(6, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');

      this.chartData
        .getFullSalesDataByRange(startDate, endDate, 172800)
        .subscribe({
          next: (resp: any) => {
            console.log('ABC', Object.values(resp));
            this.fullSalesData = Object.values(resp);
          },
        });
      this.fullDate = 'Last 6 Months';
    } else if (range === '1y') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(12, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');

      this.chartData
        .getFullSalesDataByRange(startDate, endDate, 172800)
        .subscribe({
          next: (resp: any) => {
            console.log('ABC', Object.values(resp));
            this.fullSalesData = Object.values(resp);
          },
        });
      this.fullDate = 'Last 1 Year';
    }
    this.loader = false;
  }

  onGlobalDateRangeChanged(date: NgbDate) {
    this.loader = true;
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
      this.fullDate =
        moment(beginDate, 'YYYY-M-DD').format('MMM DD YYYY') +
        ' , ' +
        moment(endDate, 'YYYY-M-DD').format('MMM DD YYYY');

      // if the difference between the dates is less than 1 week, then we will show the data in 1 hour interval
      this.loader = true;
      const diff = moment(endDate).diff(moment(beginDate), 'days');
      if (diff <= 7) {
        this.chartData
          .getFullSalesDataByRange(beginDate, endDate, 15 * 60)
          .subscribe({
            next: (resp: any) => {
              console.log('ABC', Object.values(resp));
              this.fullSalesData = Object.values(resp);
            },
          });
      }
      // if the difference between the dates is less than 1 month, then we will show the data in 1 day interval
      else if (diff <= 30) {
        this.chartData
          .getFullSalesDataByRange(beginDate, endDate, 1440 * 60)
          .subscribe({
            next: (resp: any) => {
              console.log('ABC', Object.values(resp));
              this.fullSalesData = Object.values(resp);
            },
          });
      } else {
        this.chartData
          .getFullSalesDataByRange(beginDate, endDate, 172800)
          .subscribe({
            next: (resp: any) => {
              console.log('ABC', Object.values(resp));
              this.fullSalesData = Object.values(resp);
            },
          });
      }
      this.loader = false;
    }
    this.loader = false;
  }

  makeNonEditable() {
    this.isEditable = false;
  }

  setCustomGoal(event: any) {
    this.customGoal = event.target.value;
    this.customGoalAbbr = Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(this.customGoal);
    this.customGoalProgress =
      ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
      '%';
  }

  toggleChangeModal() {
    this.showExpandedChartModal = !this.showExpandedChartModal;
  }

  onSelectCompareYearChange(event: any) {
    this.selectCompareYear = event.target.value;
  }

  fullSalesData: any;

  ngOnInit(): void {
    this.chartData.booleanSubject.next(false);
    this.chartData
      .getFullSalesData('2023-01-01 00:00:20', '2023-01-01 23:59:00', 900)
      .subscribe({
        next: (resp: any) => {
          console.log('ABC', Object.values(resp));
          this.fullSalesData = Object.values(resp);
        },
      });

    if (this.chartData.barChartPinToDB.value && this.selectedChart === 'bar') {
      this.pinActive = true;
    } else if (
      this.chartData.lineChartPinToDB.value &&
      this.selectedChart === 'line'
    ) {
      this.pinActive = true;
    } else if (
      this.chartData.pieChartPinToDB.value &&
      this.selectedChart === 'pie'
    ) {
      this.pinActive = true;
    } else {
      this.pinActive = false;
    }

    this.chartData
      .getFullSalesDataByRange('2023-03-01', '2023-03-02 ', 1440 * 60)
      .subscribe({
        next: (resp: any) => {
          const data: any = Object.values(resp);

          this.compareValue = {
            MF: data[0].totalStats.original_order_total_amount,
            GC: data[1].totalStats.original_order_total_amount,
          };

          this.customGoalProgressPercent = {
            MF:
              (data[0].totalStats.original_order_total_amount /
                this.fullSalesData[0].totalStats.original_order_total_amount) *
              100,
            GC:
              (data[1].totalStats.original_order_total_amount /
                this.fullSalesData[1].totalStats.original_order_total_amount) *
              100,
          };

          console.log(this.customGoalProgressPercent);

          this.cdr.detectChanges();
        },
      });
  }

  onSelectChartChange(event: any) {
    console.log('currentRange', this.currentRange);
    console.log(event);
    this.selectedChart = event;
    this.onRangeSelect(this.currentRange);

    // console.log('selectedChart', this.selectedChart);

    if (this.chartData.barChartPinToDB.value && this.selectedChart === 'bar') {
      this.pinActive = true;
    } else if (
      this.chartData.lineChartPinToDB.value &&
      this.selectedChart === 'line'
    ) {
      this.pinActive = true;
    } else if (
      this.chartData.pieChartPinToDB.value &&
      this.selectedChart === 'pie'
    ) {
      this.pinActive = true;
    } else {
      this.pinActive = false;
    }
  }

  getAllData(date: any) {
    this.chartData.getOrderTotalForRange(date, date).subscribe({
      next: (resp: any) => {
        this.originalOrdersTotalToday = resp[0].original_orders_total;
        this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.originalOrdersTotalToday);
        this.customGoalProgress =
          ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
          '%';
      },
    });

    this.chartData.getOrderTotalForRange(date, date).subscribe({
      next: (resp: any) => {
        this.customGoal = resp[0].original_orders_total;
        this.customGoalAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.customGoal);
        this.customGoalProgress =
          ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
          '%';
      },
    });
  }

  barChartOptions = {
    text: 'New Bar Chart 1',
    categories: ['2020/21', '2019/20', '2018/19', '2017/18', '2016/17'],
    series: this.yearData,
  };

  getSortedSlice(items: any[]): any[] {
    if (items) {
      return items
        .sort(
          (a, b) =>
            b.original_order_total_amount - a.original_order_total_amount
        )
        .slice(0, 4);
    }
    return [];
  }
}
