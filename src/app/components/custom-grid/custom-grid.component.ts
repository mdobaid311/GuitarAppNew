import {
  Component,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import {
  faClock,
  faEllipsisVertical,
  faSearch,
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

  faClock = faClock;
  faSearch = faSearch;
  faEllipsisVertical = faEllipsisVertical;

  isViewSelectContainerOpen = false;

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

  data = [
    { id: 21000, name: 25500, age: 25678, custom: 23456, data: 345566 },
    { id: 22500, name: 24000, age: 30899, custom: 26456, data: 325566 },
    { id: 23456, name: 23000, age: 40567, custom: 23456, data: 345566 },
    { id: 21000, name: 25500, age: 25678, custom: 25456, data: 335566 },
    { id: 22500, name: 24000, age: 30899, custom: 24456, data: 345566 },
    { id: 22500, name: 24000, age: 30899, custom: 24456, data: 345566 },
    { id: 22500, name: 24000, age: 30899, custom: 24456, data: 345566 },
    { id: 22500, name: 24000, age: 30899, custom: 24456, data: 345566 },
    { id: 22500, name: 24000, age: 30899, custom: 24456, data: 345566 },
    { id: 22500, name: 24000, age: 30899, custom: 24456, data: 345566 },
  ];

  filteredData = this.data;

  onSearchChange(event: any) {
    const searchValue = event.target.value;
    this.filteredData = this.data.filter((row: any) => {
      return Object.values(row).some((val: any) => {
        return String(val).toLowerCase().includes(searchValue.toLowerCase());
      });
    });
  }

  ngOnInit(): void {
    this.chartData.getFullSalesData().subscribe((data) => {
      console.log(data);
      data.forEach((element: any) => {
        console.log(Object.keys(element).length);
      });
    });
  }

  selectedColumnData: any[] = [];
  selectedColumnHeader: string = '';
}
