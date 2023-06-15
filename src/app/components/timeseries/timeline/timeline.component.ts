import { Component } from '@angular/core';
import {
  faClock,
  faCalendar,
  faEllipsisVertical,
  faArrowLeft,
  faArrowRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import data from './data.json';
import timeseriesData from './data_timeseries.json';

import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import moment from 'moment';
import { ChartService } from 'src/app/services/chartData.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  constructor(
    private chartService: ChartService,
    private userService: UserService
  ) {}

  faClock = faClock;
  faCalendar = faCalendar;
  faEllipsisVertical = faEllipsisVertical;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faTimes = faTimes;

  timelineSelectOptions = [
    { name: '1', icon: faClock },
    { name: '2', icon: faClock },
    { name: '3', icon: faClock },
    { name: '4', icon: faClock },
    { name: '5', icon: faClock },
  ];

  timeseriesDates: any;
  timeseriesData: any;
  originalData: any;
  userMileStone: any;
  rowsData: any;
  rows: any;

  user: any;

  activeType: string = 'fullseries';
  loader: boolean = false;

  changeActiveType(type: string) {
    this.activeType = type;
    this.loader = true;
    if (this.activeType === 'milestones') {
      this.chartService
        .getTimeSeriesMilestones(this.selectedDate, 69)
        .subscribe((res: any) => {
          console.log(res);
          this.timeseriesDates = res.timeLineDates;
          this.timeseriesData = res.mergedData;
          this.originalData = res.mergedData;
          this.userMileStone = res.userMilestones;
          this.loader = false;
        });

    } else if (this.activeType === 'fullseries') {
      this.chartService
        .getTimeSeriesData(this.selectedDate)
        .subscribe((res: any) => {
          console.log(res);
          this.timeseriesDates = res.dates;
          this.originalData = res.timeSeries;
          this.timeseriesData = res.timeSeries;
          this.loader = false;
        });
    }
  }

  ngOnInit() {
    this.loader = true;
    if (this.activeType === 'milestones') {
      console.log(data);
      this.timeseriesDates = data.timeLineDates;
      this.timeseriesData = data.mergedData;
      this.originalData = data.mergedData;
      this.userMileStone = data.userMilestones;

      this.rows = this.timeseriesData.reduce((acc: any, item: any) => {
        return [...acc, item.status_name];
      }, []);

      this.rowsData = this.rows.map((column: string) => {
        return {
          name: column,
          isSelected: true,
        };
      });

      this.userService.user$.subscribe((user) => {
        this.user = user;
      });
      this.loader = false;
    } else if (this.activeType === 'fullseries') {
      this.timeseriesDates = timeseriesData.dates;
      this.timeseriesData = timeseriesData.timeSeries;
      this.originalData = timeseriesData.timeSeries;

      this.rows = this.timeseriesData.reduce((acc: any, item: any) => {
        return [...acc, item.status_name];
      }, []);

      this.rowsData = this.rows.map((column: string) => {
        return {
          name: column,
          isSelected: true,
        };
      });
      this.loader = false;
    }
  }

  showSetMilestonesContainer = false;

  toggleSetMilestonesContainer() {
    this.showSetMilestonesContainer = !this.showSetMilestonesContainer;
  }

  onRowSelectChange(rowName: any) {
    const selectedRow = this.rowsData.find((row: any) => row.name === rowName);

    selectedRow.isSelected = !selectedRow.isSelected;

    this.timeseriesData = [];

    this.rowsData.forEach((row: any) => {
      if (row.isSelected) {
        const rowData = this.originalData.find(
          (item: any) => item.status_name === row.name
        );
        if (rowData) {
          this.timeseriesData.push(rowData);
        }
      }
    });
  }

  allSelected = true;

  onSelectAllRows() {
    this.allSelected = !this.allSelected;

    this.rowsData.forEach((row: any) => {
      row.isSelected = this.allSelected;
    });

    this.timeseriesData = [];

    this.rowsData.forEach((row: any) => {
      if (row.isSelected) {
        const rowData = this.originalData.find(
          (item: any) => item.status_name === row.name
        );
        if (rowData) {
          this.timeseriesData.push(rowData);
        }
      }
    });
  }

  timeSeriesModal = false;

  toggleTimeSeriesModal() {
    this.timeSeriesModal = !this.timeSeriesModal;
    console.log(this.timeSeriesModal);
  }

  statusSelectionContainer = false;

  toggleStatusSelectionContainer() {
    this.statusSelectionContainer = !this.statusSelectionContainer;
  }

  onSearch(event: any) {
    this.timeseriesData = this.originalData.filter((item: any) => {
      return item.status_name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
  }

  selectedDate: any = '2023-03-22';

  onDateChanged(event: IMyDateModel) {
    const formattedDate = moment(
      event.singleDate?.formatted,
      'DD.MM.YYYY'
    ).format('YYYY-MM-DD');

    this.selectedDate = formattedDate;

    if (this.activeType === 'milestones') {
      this.chartService
        .getTimeSeriesMilestones(formattedDate, 69)
        .subscribe((res: any) => {
          console.log(res);
          this.timeseriesDates = res.timeLineDates;
          this.timeseriesData = res.mergedData;
          this.originalData = res.mergedData;
          this.userMileStone = res.userMilestones;
        });
    } else if (this.activeType === 'fullseries') {
      this.chartService
        .getTimeSeriesData(formattedDate)
        .subscribe((res: any) => {
          console.log(res);
          this.timeseriesDates = res.dates;
          this.timeseriesData = res.timeSeries;
        });
    }
  }

  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy',
    appendSelectorToBody: true,
    markCurrentDay: true,
    alignSelectorRight: true,
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

  milestone1 = 0;
  milestone2 = 0;
  milestone3 = 0;
  milestone4 = 0;
  milestone5 = 0;

  changeMilestone(event: any, milestone: any) {
    console.log(event.target.value);
    if (milestone == 1) {
      this.milestone1 = event.target.value;
    }
    if (milestone == 2) {
      this.milestone2 = event.target.value;
    }
    if (milestone == 3) {
      this.milestone3 = event.target.value;
    }
    if (milestone == 4) {
      this.milestone4 = event.target.value;
    }
    if (milestone == 5) {
      this.milestone5 = event.target.value;
    }
  }

  saveMilestoneMessage: string = '';

  saveMilestone() {
    const milestoneData = {
      userid: this.user?.id,
      msone: this.milestone1,
      mstwo: this.milestone2,
      msthree: this.milestone3,
      msfour: this.milestone4,
      msfive: this.milestone5,
      mssix: 1,
    };

    this.chartService.setUserMilestones(milestoneData).subscribe((res: any) => {
      this.saveMilestoneMessage = res.message;
    });

    this.chartService
      .getTimeSeriesMilestones(this.selectedDate, 69)
      .subscribe((res: any) => {
        console.log(res);
        this.timeseriesDates = res.timeLineDates;
        this.timeseriesData = res.mergedData;
        this.originalData = res.mergedData;
        this.userMileStone = res.userMilestones;
      });
  }
}
