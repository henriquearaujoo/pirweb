import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd,
    Router, NavigationStart, Event as NavigationEvent, CanActivate
} from '@angular/router';
import { Permissions, RuleState } from '../helpers/permissions';

@Injectable()
export class PageGuard implements CanActivate {

    constructor(
        private permissions: Permissions,
        private  router: Router
    ) {
        // this.permissions.canActivate(router.routerState.snapshot.url);
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<boolean> | boolean {
        // this.isRead = (state.url === '/user-list' ||
        //                state.url === '/profile-list' ||
        //                state.url === '/template-chapter');

            console.log('state ###', state.url);
            console.log('canRead ###', this.permissions.canRead);
            return this.permissions.canActivate(state.url);
    }

// tslint:disable-next-line:eofline
}