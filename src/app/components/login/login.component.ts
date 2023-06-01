import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  username: string = '';
  password: string = '';

  loginError: boolean = false;

  onUserNameChange(event: any) {
    this.username = event.target.value;
  }

  onPasswordChange(event: any) {
    this.password = event.target.value;
  }

  onLoginClick() {
    this.userService.login(this.username, this.password).subscribe(
      (data) => {
        console.log(data);
        if (data) {
          this.loginError = false;
          this.userService.setUser(data);
          this._router.navigate(['/']);
        }
      },
      (error) => {
        this.loginError = true;
        console.log("error");
      }
    );
  }

  ngOnInit(): void {}
}
