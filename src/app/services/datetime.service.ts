import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatetimeService {
  private date: any;
  private daterange: any;

  constructor() {}

  public getDate() {
    return this.date;
  }

  public getDaterange() {
    return this.daterange;
  }

  public updateDaterange(value: any) {
    this.daterange = JSON.stringify(value);
  }
}
