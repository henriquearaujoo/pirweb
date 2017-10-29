import { Router } from '@angular/router';
import { AuthenticationService } from './../services/login/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(
    private authenticationService: AuthenticationService,
    private  router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if (this.authenticationService.userAuthenticated() || localStorage.getItem('currentUser')) {
      return true;

    }
    this.router.navigate(['/login']);
    return false;
  }
}
