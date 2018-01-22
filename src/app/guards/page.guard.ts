import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd,
    Router, NavigationStart, Event as NavigationEvent, CanActivate
} from '@angular/router';
import { Permissions, RuleState } from '../helpers/permissions';

@Injectable()
export class PageGuard implements CanActivate {
    isRead: boolean;
    isCreate: boolean;
    isUpdate: boolean;
    isDelete: boolean;

    read: boolean;

    constructor(
        private permissions: Permissions
    ) {
        this.isRead = false;
        this.isCreate = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.read = false;
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<boolean> | boolean {
        this.isRead = (state.url === '/user-list' ||
                       state.url === '/profile-list' ||
                       state.url === '/template-chapter');

        // if (this.isRead) {
            // this.permissions.canActivate(state.url);
            console.log('state ###', state.url);
            console.log('canRead ###', this.permissions.canRead);
            return this.permissions.canActivate(state.url);
        // }
    }

}