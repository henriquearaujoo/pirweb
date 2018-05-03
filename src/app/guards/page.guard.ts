import { SweetAlertService } from './../services/sweetalert/sweet-alert.service';
import { ToastService } from './../services/toast-notification/toast.service';
import { error } from 'util';
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
        private  router: Router,
        private sweetAlertService: SweetAlertService
    ) {
        // this.permissions.canActivate(router.routerState.snapshot.url);
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<boolean> | boolean {

        this.permissions.canActivate([state.url]);
        return this.permissions.permissionsState.map(
            (rules: RuleState) => {
            if (rules.canRead) {
                return rules.canRead;
            }
            this.sweetAlertService.alertPermission('/home');
            // this.router.navigate(['/home']);
            return rules.canRead;
        });
    }

// tslint:disable-next-line:eofline
}