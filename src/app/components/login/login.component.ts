import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private _router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  username: string = '';
  password: string = '';

  onUserNameChange(event: any) {
    this.username = event.target.value;
  }

  onPasswordChange(event: any) {
    this.password = event.target.value;
  }

  onLoginClick() {
    if (this.username == 'mdobaid311@gmail.com' && this.password == 'Obaid311') {
      this._router.navigate(['/dashboard']);
    }else{
      alert("Invalid Username or Password");
    }
  }
}
