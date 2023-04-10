import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent {
  data = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 40 }
  ];
  selectedColumnData: any[] = [];
  selectedColumnHeader: string = '';

  onColumnHeaderClick(header: string) {
    this.selectedColumnHeader = header;
    this.selectedColumnData = this.data.map((row:any) => row[header]);
    console.log(this.selectedColumnData);
  }
}
