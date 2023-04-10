import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
})
export class ThemeSwitchComponent {
  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }

  onChange() {
    // Get the checkbox
    var checkBox = document.getElementById('theme-switch') as HTMLInputElement;

    if (checkBox.checked == true) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
