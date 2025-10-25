import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../core/services/global-service/global-service.service';
import { UsersService } from './../../core/services/users/users-service.service';
import { User } from './../../core/models/User';

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrls: ['./layout-component.component.css'],
  standalone: false
})
export class LayoutComponentComponent implements OnInit {
  /**
   * @param navbarOpen boolean
   */
  navbarOpen = false;

  /**
   * @param loggedIn boolean
   */
  loggedIn = false;

  /**
   * @param user User | undefined
   */
  public user: User | undefined;

  /**
   * @param globalService GlobalService
   * @param usersService UsersService
   */
  constructor(
    private globalService: GlobalService,
    private usersService: UsersService
  ) {
  }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.loggedIn = this.usersService.isLoggedIn();
    if (this.loggedIn) {
      this.globalService.resetUserData();
      this.user = this.globalService._currentUser;
    }
  }

  /**
   * Toggle navbar menu.
   */
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
