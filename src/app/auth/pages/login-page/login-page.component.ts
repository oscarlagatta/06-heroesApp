import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: []
})
export class LoginPageComponent {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) {
  }

  onLogin() {
    this.authService.login('oscar@gmail.com', '123456')
      .subscribe(user => {

        this.router.navigate(['/']);
      });
  }
}
