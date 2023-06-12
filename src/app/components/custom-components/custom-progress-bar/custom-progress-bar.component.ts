import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-progress-bar',
  templateUrl: './custom-progress-bar.component.html',
  styleUrls: ['./custom-progress-bar.component.scss'],
})
export class CustomProgressBarComponent {
  @Input() customGoalProgress: number = 0;
  progress: string = '';

  constructor() {}

  ngOnInit() {
    this.progress = this.customGoalProgress + '%';
    console.log(this.progress +"progress");

  }

  ngOnChanges() {
    this.progress = this.customGoalProgress + '%';
    console.log(this.progress +"chnages");
  }
}
