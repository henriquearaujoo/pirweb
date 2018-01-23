import { Constant } from './../../constant/constant';
import { Rule } from './../../models/rule';
import { Component, OnInit, OnDestroy, Compiler } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, RouterState } from '@angular/router';
import { ModalService } from '../modal/modal.service';
import { Permissions, RuleState } from '../../helpers/permissions';
import { Subscribable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MENU } from './side-bar-menu-item';
import { AuthenticationService } from '../../services/login/authentication.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent implements OnInit, OnDestroy {
  private url: string;
  private routes: any[];
  private urlToNavigate: string;
  private isForm: boolean;
  private hide = false;
  private subscription: Subscription;
  private rules: any[] = new Array();
  private show: number;
  private menu: any[] = MENU;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private permissions: Permissions,
    private authenticationService: AuthenticationService) {
    const state: RouterState = router.routerState;
      const snapshot: RouterStateSnapshot = state.snapshot;
      const root: ActivatedRouteSnapshot = snapshot.root;
      console.log('state', state);
      console.log('snapshot', snapshot.url);
      this.url = snapshot.url;
      console.log('root', root);
  }

  ngOnInit() {
    this.routes = this.router.config;
    localStorage.setItem('currentURL', this.router.url);

    this.subscription = this.permissions.ruleState.subscribe(
      (rules: RuleState) => {
        this.rules = rules.permissions;
       console.log('PERMISSIONS EVENT:', this.rules);
       console.log('menu.length', this.menu.length);
       for (let i = 0; i < this.menu.length; i++) {
         for ( let j = 0; j < this.rules.length; j++) {
          if (this.menu[i].route === this.rules[j].page_id) {
            this.menu[i].read = this.rules[j].read;
            break;
          }
         }
       }

       for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].category === 'parent') {
          for ( let j = 0; j < this.menu.length; j++) {
            if ( this.menu[j].parent === this.menu[i].id) {
              if ( this.menu[j].read ) {
                this.menu[i].read = true;
                break;
              } else {
                this.menu[i].read = false;
              }
            }
          }
        }
      }

      });
      console.log('PERMISSIONS side bar: ', this.menu);
  }

  isActive(instruction: String[]): boolean {
    let result = false;
    instruction.forEach(element => {
      if (element.toString() === '/') {
        result = this.router.isActive(element.toString(), true);
      } else if (this.router.isActive(element.toString(), false)) {
        result = true;
      }
    });
    return result;
  }

  private redirectTo(componentName: string) {

    const currentURL = this.router.url;
    this.urlToNavigate = componentName;

    if (currentURL === null) {
      this.router.navigate([this.urlToNavigate]);
    } else {
      this.isForm = (currentURL.toLowerCase() === '/chapter-dashboard') ||
                    (currentURL.toLowerCase() === '/user');
      if (this.isForm) {
        this.modalService.modalCancel(this.urlToNavigate);
        // (<HTMLButtonElement> document.getElementById('btnModal')).click();
      } else {
        this.router.navigate([this.urlToNavigate]);
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('Destroy!!');
  }

//  confirmModalToLeavePage() {
//     this.router.navigate([this.urlToNavigate]);
//   }
}
