import { Users } from './../../data/UsersList';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalService } from '../global-service/global-service.service';
import { User } from '../../models/User';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  /**
   * @param _users User[]
   */
  private _users = Users;

  /**
   * @param _jwt JwtHelperService
   */
  private _jwt = new JwtHelperService();

  /**
   * @param _globalService GlobalService
   * @param platformId Object
   */
  constructor(
    private _globalService: GlobalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /*public registration(model): Observable<any> {
    return this._httpClient.post(HttpClientService.USERS_CONTROLLER, model, null, false, true);
  }*/

    /**
   * Save user to local storage.
   * 
   * @param user string
   * @returns void
   */
  public saveUser(user: string): void {
    if (isPlatformBrowser(this.platformId) && user) {
      localStorage.setItem('token', user);
      this._globalService.resetUserData();
    }
  }

    /**
   * Login method.
   * 
   * @param credentials any
   * @returns string|null
   */
  public login(credentials: any): string | null {
    const index = Users.findIndex(item =>
      item.Email === credentials.email || item.Password === credentials.password
    );
    if (index === -1) {
      return null;
    }

    const user = Users[index];
    user.Roles = [];
    delete user.Password;

    return JSON.stringify(user);
  }

  /**
   * Logout method.
   */
  public logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  /**
   * Check if user is logged in.
   * 
   * @returns boolean
   */
  public isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  /**
   * Get token from local storage.
   */
  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  /**
   * Get user by id.
   */
  public getUserById(id: number): User {
    return this._users[id];
  }
}
