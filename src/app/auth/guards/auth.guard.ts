import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import {Observable, tap} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch, CanActivate {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) {
  }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthenticationStatus()
      .pipe(
        tap( isAuthenticated => console.log(`authenticated::: ${isAuthenticated}`)),
        tap(isAuthenticated => {
          if (!isAuthenticated) this.router.navigate(['./auth/login'])
        })
      )
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthStatus();
    // console.log('Can Match')
    // console.log({route, segments})
    // return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkAuthStatus();
    // console.log('Can Activate')
    // console.log({route, state})
    //
    // return false;
  }


}
