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
  @Output() onTableSelectChange = new EventEmitter<string>();

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

  onSelectTableChange(tableName: string) {
    this.chartData.getTableData(tableName).subscribe((res: any) => {
      console.log('order_book_line', res);
      const tableData = res.map((row: any) => {
        return Object.values(row);
      });
      this.columns = Object.keys(res[0]);
      this.data = tableData;
      this.filteredData = tableData;
      this.onTableSelectChange.emit(res);
    });
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

  ngOnInit(): void {
    this.columns = Object.keys(this.dataArray[0]);
    const tableData = this.dataArray.map((row: any) => {
      return Object.values(row);
    });
    this.data = tableData;
    this.filteredData = tableData;
  }

  selectedColumnData: any[] = [];
  selectedColumnHeader: string = '';
}
