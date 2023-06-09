import { Component } from '@angular/core';
import {
  faClock,
  faCalendar,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import data from './data.json';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import moment from 'moment';
import { ChartService } from 'src/app/services/chartData.service';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  constructor(private chartService: ChartService) {}

  faClock = faClock;
  faCalendar = faCalendar;
  faEllipsisVertical = faEllipsisVertical;

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

  rowsData: any;
  rows: any;

  ngOnInit() {
    this.timeseriesDates = data.dates;
    this.timeseriesData = data.timeSeries;
    this.originalData = data.timeSeries;

    this.rows = this.timeseriesData.reduce((acc: any, item: any) => {
      return [...acc, item.status_name];
    }, []);

    this.rowsData = this.rows.map((column: string) => {
      return {
        name: column,
        isSelected: true,
      };
    });
  }

  onRowSelectChange(rowName: any) {
    // Find the selected row
    const selectedRow = this.rowsData.find((row: any) => row.name === rowName);

    // Toggle the isSelected property of the selected row
    selectedRow.isSelected = !selectedRow.isSelected;

    // Update the timeseriesData based on the isSelected property
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

    console.log(this.timeseriesData);
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

    this.chartService.getTimeSeriesData(formattedDate).subscribe((res: any) => {
      console.log(res);
      this.timeseriesDates = res.dates;
      this.timeseriesData = res.timeSeries;
    });
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
}
