import { State } from './../models/states';
import { AuthenticationService } from './../services/login/authentication.service';
import { AccessPageService } from './../services/page/page.service';
import { Page } from './../models/page';
import { Rule } from '../models/rule';
import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader/loader.service';
import { Profile } from '../models/profile';

@Injectable()
export class Permissions implements OnDestroy {
    private rules: Rule[] = new Array();
    private permissions: Rule[];
    private pages: Page[] = new Array();

    returnUrl: string[];
    private rulesSubject = new Subject<RuleState>();
    ruleState = this.rulesSubject.asObservable();

    private permissionsSubject = new Subject<RuleState>();
    permissionsState = this.permissionsSubject.asObservable();

    can_not_access = new EventEmitter();

    constructor(
        private authenticationService: AuthenticationService,
        private accessPageService: AccessPageService,
        private  router: Router,
        private loaderService: LoaderService) {
        }

    canActivate(url: string[]) {
        this.returnUrl = url;
        console.log(this.returnUrl);
        const profile = localStorage.getItem('profileId_rules');

        if (profile !== undefined || profile !== null) {
            this.loaderService.show();
            this.authenticationService.getPermissions(profile).subscribe(
                success_rules => {
                    this.rules = success_rules;
                    // console.log(this.rules);
                    // this.loaderService.hide();
                    if (this.rules.length !== 0) {
                        this.rulesSubject.next(<RuleState>{permissions: this.rules});
                        for ( let i = 0; i < this.rules.length; i++) {
                            if ( this.returnUrl.includes('/' + this.rules[i].page.route)) {
                                if ( this.rules[i].read) {
                                    // console.log('acesso permitido!');
                                    this.permissionsSubject.next(<RuleState>{
                                        profile: this.rules[i].profile,
                                        canRead: this.rules[i].read,
                                        canCreate: this.rules[i].create,
                                        canUpdate: this.rules[i].update,
                                        canDelete: this.rules[i].delete
                                    });
                                    break;
                                } else {
                                    // console.log('acesso negado!');
                                    this.permissionsSubject.next(<RuleState>{
                                        profile: this.rules[i].profile,
                                        canRead: this.rules[i].read,
                                        canCreate: this.rules[i].create,
                                        canUpdate: this.rules[i].update,
                                        canDelete: this.rules[i].delete
                                    });
                                    // this.loaderService.hide();
                                }
                            } else {
                                this.loaderService.hide();
                            }
                        }
                    }
                },
                error => {
                    this.loaderService.hide();
                }
            );
        }
      }

      setPermission(permission: boolean) {
        this.can_not_access.emit(permission);
      }

      getPermission() {
        const profile = localStorage.getItem('profileId_rules');
        if (profile !== undefined || profile !== null) {
            this.authenticationService.getPermissions(profile).subscribe(
                success_rules => {
                    this.rules = success_rules;
                    this.rulesSubject.next(<RuleState>{permissions: this.rules});
                }
            );
        }
      }

    ngOnDestroy(): void {
    }
  }

  export interface RuleState {
    permissions: Rule[];
    profile: Profile;
    canRead: boolean;
    canUpdate: boolean;
    canCreate: boolean;
    canDelete: boolean;
  }
