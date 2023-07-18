import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../../auth/interfaces/user.interface";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: []
})
export class LayoutPageComponent {
  public sidebarItems = [
    {
      label: 'List',
      icon: 'label',
      url: './list'
    },
    {
      label: 'Add',
      icon: 'add',
      url: './new-hero'
    },
    {
      label: 'Search',
      icon: 'search',
      url: './search'
    },

  ];

  constructor(
    private router: Router,
    private readonly authService: AuthService) {
  }

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
  }
}
