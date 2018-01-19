import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd,
    Router, NavigationStart, Event as NavigationEvent, CanActivate
} from '@angular/router';
import { Permissions } from './permissions';

@Injectable()
export class PageGuard implements CanActivate {

    constructor(
        private permissions: Permissions
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<boolean> | boolean {

        this.permissions.canActivate(state.url);
        console.log('isActivate ###', this.permissions.isActivate);
        return this.permissions.isActivate;
    }

}