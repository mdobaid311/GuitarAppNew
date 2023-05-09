import { Component, ViewChild, Renderer2 } from '@angular/core';
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
} from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent {
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

  yearData: any = [];
  dataRows = [];

  loader = false;

  showChangeModal = false;
  selectCompareYear: any;

  todaysDate = moment(new Date()).format('YYYY-MM-DD');
  fullDate: any = moment(new Date()).format('YYYY-MM-DD');

  customGoal = 0;
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

  selectedChart = 'column';

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
          border-bottom-color: #19376D;
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
          background-color: #19376D;
        }
        .dp1 .myDpPrevMonth,
        .dp1 .myDpNextMonth {
          color: #bbb;
        }
        .dp1 .myDpWeekDayTitle {
          background-color: #19376D;
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
          background-color: #19376D;
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
          background-color: #19376D;
        }
        .dp1 .myDpDisabled {
          color: #fff;
          background: repeating-linear-gradient(-45deg, #19376D 7px, #d3d3d3 8px, transparent 7px, transparent 14px);
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
    private router: Router,
    calendar: NgbCalendar
  ) {
    this.globalFromDate = calendar.getToday();
    this.globalToDate = calendar.getToday();
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

  onDateChanged(event: IMyDateModel) {
    const begin = event.dateRange?.beginDate;
    const end = event.dateRange?.endDate;
    console.log('first');
    const beginDate = begin
      ? begin.year + '-' + begin.month + '-' + begin.day
      : null;
    const endDate = end ? end.year + '-' + end.month + '-' + end.day : null;

    this.chartData.getOrderTotalForRange(beginDate, endDate).subscribe({
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

  onRangeSelect(range: any) {
    console.log('Range Selected', range)
    this.chartData.selectedRange.next(range);
    this.chartData.booleanSubject.next(true);
    this.loader = true;

    this.currentRange = range;
    if (range === '1m') {
      const startDate = moment()
        .subtract(1, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment().format('YYYY-MM-DD HH:mm');

      this.chartData.getOrderTotalByDayRange(startDate, endDate).subscribe({
        next: (resp: any) => {
          this.originalOrdersTotalToday = resp.totalAmount;
          this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(this.originalOrdersTotalToday);
          this.customGoalProgress =
            ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(
              1
            ) + '%';
          let dayData: any = [];
          this.dayList = resp.data.map((item: any) => item.day);
          resp.data.forEach((item: IDay) => {
            const itemData = [item.day, item.total];
            dayData.push(itemData);
          });
          this.chartData.dataArray.next(dayData);
        },
      });
      this.fullDate = 'Last 1 Month';
    } else if (
      range === '2h' ||
      range === '6h' ||
      range === '12h' ||
      range === '1d'
    ) {
      let startDate = '';
      let endDate = '';
      if (range === '2h') {
        startDate = moment().subtract(2, 'hours').format('YYYY-MM-DD HH:mm');
        endDate = moment().format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 2 Hours';
      } else if (range === '6h') {
        startDate = moment().subtract(6, 'hours').format('YYYY-MM-DD HH:mm');
        endDate = moment().format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 6 Hours';
      } else if (range === '12h') {
        startDate = moment().subtract(12, 'hours').format('YYYY-MM-DD HH:mm');
        endDate = moment().format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 12 Hours';
      } else if (range === '1d') {
        startDate = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm');
        endDate = moment().format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 24 Hours';
      }
      this.chartData.getOrderTotalByHourRange(startDate, endDate).subscribe({
        next: (resp: any) => {
          this.originalOrdersTotalToday = resp.totalAmount;
          this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(this.originalOrdersTotalToday);
          this.customGoalProgress =
            ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(
              1
            ) + '%';
          let hourData: any = [];
          this.hourList = resp.data.map((item: any) => item.hour);
          resp.data.forEach((item: IHour) => {
            const itemData = [item.hour, item.total];
            hourData.push(itemData);
          });
          this.chartData.dataArray.next(hourData);
        },
      });
    } else if (range === '6m') {
      const startDate = moment()
        .subtract(6, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment().format('YYYY-MM-DD HH:mm');

      this.chartData.getOrderTotalByMonthRange(startDate, endDate).subscribe({
        next: (resp: any) => {
          this.originalOrdersTotalToday = resp.totalAmount;
          this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(this.originalOrdersTotalToday);
          this.customGoalProgress =
            ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(
              1
            ) + '%';
          let monthData: any = [];
          this.monthList = resp.data.map((item: any) => item.month);
          resp.data.forEach((item: IMonth) => {
            const itemData = [item.month, item.total];
            monthData.push(itemData);
          });
          this.chartData.dataArray.next(monthData);
        },
      });
      this.fullDate = 'Last 6 Months';
    } else if (range === '1y') {
      const startDate = moment()
        .subtract(12, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment().format('YYYY-MM-DD HH:mm');

      this.chartData.getOrderTotalByMonthRange(startDate, endDate).subscribe({
        next: (resp: any) => {
          this.originalOrdersTotalToday = resp.totalAmount;
          this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(this.originalOrdersTotalToday);
          this.customGoalProgress =
            ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(
              1
            ) + '%';
          let monthData: any = [];
          this.monthList = resp.data.map((item: any) => item.month);
          resp.data.forEach((item: IMonth) => {
            const itemData = [item.month, item.total];
            monthData.push(itemData);
          });
          this.chartData.dataArray.next(monthData);
        },
      });
      this.fullDate = 'Last 1 Year';
    }
    this.loader = false;
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
      this.fullDate =
        moment(beginDate, 'YYYY-M-DD').format('MMM DD YYYY') +
        ' , ' +
        moment(endDate, 'YYYY-M-DD').format('MMM DD YYYY');

      this.chartData.getOrderTotalByDayRange(beginDate, endDate).subscribe({
        next: (resp: any) => {
          this.originalOrdersTotalToday = resp.totalAmount;
          this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(this.originalOrdersTotalToday);
          this.customGoalProgress =
            ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(
              1
            ) + '%';
          let dayData: any = [];
          this.dayList = resp.data.map((item: any) => item.day);
          resp.data.forEach((item: IDay) => {
            const itemData = [item.day, item.total];
            dayData.push(itemData);
          });
          this.chartData.dataArray.next(dayData);
        },
      });
    }
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
    this.showChangeModal = !this.showChangeModal;
  }

  onSelectCompareYearChange(event: any) {
    this.selectCompareYear = event.target.value;
  }

  ngOnInit(): void {
    this.chartData.booleanSubject.next(false);

    this.chartData.getOrderTotalForRange('2023-01-31', '2023-01-31').subscribe({
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

    this.chartData.getOrderTotalForRange('2023-01-30', '2023-01-30').subscribe({
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

  onSelectChartChange(event: any) {
    console.log('currentRange', this.currentRange);
    console.log(event);
    this.selectedChart = event;
    this.onRangeSelect(this.currentRange);

    // console.log('selectedChart', this.selectedChart);
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
}

class IItem {
  'monthName': string;
  'total': number;
}

class IDay {
  'day': string;
  'total': number;
}

class IHour {
  'hour': string;
  'total': number;
}
class IMonth {
  'month': string;
  'total': number;
}
class IYear {
  'year': string;
  'total': number;
}
