import { Injectable } from '@angular/core';
import {
        CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd,
        Router, NavigationStart, Event as NavigationEvent
    } from '@angular/router';
import { ChapterDashboardComponent } from '../views/template-chapter/chapter/chapter-dashboard/chapter-dashboard.component';
import { Observable } from 'rxjs/Observable';
import { IFormCanDeActivate } from './iform-candeactivate';


@Injectable()
export class DeactivateGuard implements CanDeactivate<IFormCanDeActivate> {
    private canChange = false;
    constructor(private router: Router) { }
    canDeactivate(
        component: IFormCanDeActivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        // this.router.events.forEach((event: NavigationEvent) => {
        //     if (event instanceof NavigationEnd) {
        //         console.log('destination:' + event.url );
        //     }
        //   });
        console.log('Guarda de desativação de rota!');
        //  component.openModal();
        //  this.canChange = component.canChangePage;
         return  true;

    }
}
