import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd,
    Router, NavigationStart, Event as NavigationEvent, CanActivate
} from '@angular/router';
import { Permissions } from './permissions';

@Injectable()
export class PageGuard implements CanActivate {
    isRead: boolean;
    isCreate: boolean;
    isUpdate: boolean;
    isDelete: boolean;

    constructor(
        private permissions: Permissions
    ) {
        this.isRead = false;
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<boolean> | boolean {
        this.isRead = (state.url === 'user-list' ||
                       state.url === 'profile-list' ||
                       state.url === 'template-chapter');

        if (this.isRead) {
            this.permissions.canActivate(state.url);
            console.log('isActivate ###', this.permissions.isActivate);
            return this.permissions.isActivate;
        }
    }

}