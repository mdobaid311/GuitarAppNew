import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-progress-bar',
  templateUrl: './custom-progress-bar.component.html',
  styleUrls: ['./custom-progress-bar.component.scss'],
})
export class CustomProgressBarComponent {
  @Input() customGoalProgress: any ;
  progress: any;

  constructor() {}

  ngOnInit() {
    this.progress = this.customGoalProgress + '%';
    console.log(this.customGoalProgress)
  }

  ngOnChanges() {
    console.log(this.customGoalProgress);
  }
}
