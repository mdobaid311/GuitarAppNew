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
  faFileExport,
  faSearch,
  faTableCells,
} from '@fortawesome/free-solid-svg-icons';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chartData.service';
import { WorkBook, utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

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
  faFileExport = faFileExport;

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

  query: string = '';

  ngOnChanges() {
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

  onQueryChange(event: any) {
    this.query = event.target.value;
  }

  getQueryData() {
    console.log('query', this.query);
    this.chartData.getCustomQueryData(this.query).subscribe((res: any) => {
      const tableData = res.map((row: any) => {
        return Object.values(row);
      });
      this.originalData = res;
      this.columns = Object.keys(res[0]);
      this.columnsData = this.columns.map((column: string) => {
        return {
          name: column,
          isSelected: true,
        };
      });
      this.data = tableData;
      this.filteredData = tableData;
      this.onTableSelectChange.emit({
        data: res,
        tableName: 'Custom_table',
      });
    });
  }

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

  exportToExcel() {
    this.createExcelFile(this.filteredData, 'order_book_line');
  }

  onSelectTableChange(tableName: string) {
    this.chartData.getTableData(tableName).subscribe((res: any) => {
      const tableData = res.map((row: any) => {
        return Object.values(row);
      });
      this.originalData = res;
      this.columns = Object.keys(res[0]);
      this.data = tableData;
      this.filteredData = tableData;
      this.columnsData = this.columns.map((column: string) => {
        return {
          name: column,
          isSelected: true,
        };
      });
      this.onTableSelectChange.emit({
        data: res,
        tableName: tableName,
      });
    });
  }
  selectAll: boolean = true;

  selectOrUnselectAllColumns() {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.columnsData = this.columnsData.map((column: any) => {
        column.isSelected = true;
        return column;
      });
      this.columns = this.columnsData.map((column: any) => {
        return column.name;
      });
      const tableData = this.originalData.map((row: any) => {
        return Object.values(row);
      });
      this.data = tableData;
      this.filteredData = tableData;
    } else {
      this.columnsData = this.columnsData.map((column: any) => {
        column.isSelected = false;
        return column;
      });
      this.columns = [];
      this.data = [];
      this.filteredData = [];
    }
  }

  onColumnSelectChange(columnName: string) {
    //  if column is not selected, remove column from data
    if (this.columns.find((column: any) => column === columnName)) {
      console.log('column found');
      this.columns = this.columns.filter((column: string) => {
        return column !== columnName;
      });
      this.columnsData = this.columnsData.map((column: any) => {
        if (column.name === columnName) {
          column.isSelected = false;
        }
        return column;
      });
      // create a copy of original data
      // const dataCopy = [...this.originalData];

      const modifiedData = this.originalData.map((row: any) => {
        const newRow: any = {};
        this.columns.forEach((column: string) => {
          newRow[column] = row[column];
        });

        return newRow;
      });
      const tableData = modifiedData.map((row: any) => {
        return Object.values(row);
      });
      this.data = tableData;
      this.filteredData = this.data;
    }
    // if column is selected, add column to data
    else {
      // filter original data and add only those columns in data that are in columns arrray
      this.columns.unshift(columnName);
      this.columnsData = this.columnsData.map((column: any) => {
        if (column.name === columnName) {
          column.isSelected = true;
        }
        return column;
      });

      console.log(this.originalData);
      const modifiedData = this.originalData.map((row: any) => {
        const newRow: any = {};
        this.columns.forEach((column: string) => {
          newRow[column] = row[column];
        });

        return newRow;
      });
      const tableData = modifiedData.map((row: any) => {
        return Object.values(row);
      });
      this.data = tableData;
      this.filteredData = this.data;
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
    console.log('data');
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
