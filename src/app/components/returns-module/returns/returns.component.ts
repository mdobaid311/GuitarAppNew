import { Component } from '@angular/core';
import { ReturnsService } from 'src/app/services/returns.service';
import data from "./data.json"

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss'],
})
export class ReturnsComponent {
  loader = false;

  constructor(private returnsServices: ReturnsService) {}

  returnsData:any

  ngOnInit(): void {
    // this.loader = true;
    // this.returnsServices.getReturnsData('2023-03-22').subscribe((res) => {
    //   console.log(res);
    //   this.returnsData = res;
    //   this.loader = false;
    // });

    this.returnsData = data
  }
}
