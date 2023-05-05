import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { faClock, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.scss'],
})
export class CustomGridComponent {
  @Output() onColumnHeaderClick = new EventEmitter<string>();

  faClock = faClock;
  faSearch = faSearch;
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

  constructor() {}

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

  selectedColumnData: any[] = [];
  selectedColumnHeader: string = '';
}
