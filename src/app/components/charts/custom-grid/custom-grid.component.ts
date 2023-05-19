import { map } from 'rxjs/operators';
import {
  Component,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  Input,
} from '@angular/core';
import {
  faClock,
  faEllipsisVertical,
  faSearch,
  faTableCells,
} from '@fortawesome/free-solid-svg-icons';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chartData.service';

@Component({
  selector: 'app-custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.scss'],
})
export class CustomGridComponent {
  @Output() onColumnHeaderClick = new EventEmitter<string>();
  @Input() dataArray: any[] = [];
  @Output() onTableSelectChange = new EventEmitter<any>();

  faClock = faClock;
  faSearch = faSearch;
  faEllipsisVertical = faEllipsisVertical;
  faTableCells = faTableCells;

  isViewSelectContainerOpen = false;

  columns: any = [];

  tables = [
    {
      name: 'order_book_charges',
    },
    {
      name: 'order_book_line',
    },
    {
      name: 'order_book_header',
    },
    {
      name: 'order_book_taxes',
    },
  ];

  originalData: any = [];

  onSelectTableChange(tableName: string) {
    this.chartData.getTableData(tableName).subscribe((res: any) => {
      console.log('order_book_line', res);
      console.log('this.originalData', this.originalData);
      const tableData = res.map((row: any) => {
        return Object.values(row);
      });

      this.columns = Object.keys(res[0]);
      this.data = tableData;
      this.filteredData = tableData;
      this.onTableSelectChange.emit({
        data: res,
        tableName: tableName,
      });
    });
  }

  onColumnSelectChange(columnName: string) {
    //  if column is not selected, remove column from data
    if (this.columns.find((column: any) => column === columnName)) {
      console.log('column found');
      const modifiedData = this.originalData.map((row: any) => {
        delete row[columnName];
        return row;
      });
      const tableData = modifiedData.map((row: any) => {
        return Object.values(row);
      });
      this.data = tableData;
      this.filteredData = this.data;
      this.columns = this.columns.filter((column: string) => {
        return column !== columnName;
      });
      this.columnsData = this.columnsData.map((column: any) => {
        if (column.name === columnName) {
          column.isSelected = false;
        }
        return column;
      });
    }
    // if column is selected, add column to data
    else {

    }
  }

  toggleViewSelectContainer() {
    this.isViewSelectContainerOpen = !this.isViewSelectContainerOpen;
  }

  constructor(
    private elementRef: ElementRef,
    private chartData: ChartService
  ) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isViewSelectContainerOpen = false;
    }
  }

  intervalsList = [
    { name: '15 Min' },
    { name: '30 Min' },
    { name: '1 Hour' },
    { name: '6 Hour' },
    { name: '1 Day' },
  ];

  headerClickHandler(header: string) {
    this.selectedColumnHeader = header;
    this.selectedColumnData = this.data.map((row: any) => row[header]);
    this.onColumnHeaderClick.emit(header);
  }

  theme = 'light';

  data: any = [];
  filteredData = this.data;

  onSearchChange(event: any) {
    const searchValue = event.target.value;
    this.filteredData = this.data.filter((row: any) => {
      return row.some((val: any) => {
        return String(val).toLowerCase().includes(searchValue.toLowerCase());
      });
    });
  }

  loader: boolean = false;
  columnsData: any = [];
  ngOnInit(): void {
    this.originalData = this.dataArray;
    this.columns = Object.keys(this.dataArray[0]);
    this.columnsData = this.columns.map((column: string) => {
      return {
        name: column,
        isSelected: true,
      };
    });
    const tableData = this.dataArray.map((row: any) => {
      return Object.values(row);
    });
    this.data = tableData;
    this.filteredData = tableData;
  }

  selectedColumnData: any[] = [];
  selectedColumnHeader: string = '';
}
