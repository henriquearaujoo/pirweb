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

@Injectable()
export class Permissions implements OnDestroy {
    private rules: Rule[] = new Array();
    private permissions: Rule[];
    private pages: Page[] = new Array();

    returnUrl: string;
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

    canActivate(url: string) {
        this.returnUrl = url;

        const profile = localStorage.getItem('profileId_rules');

        if (profile !== undefined || profile !== null) {
            this.loaderService.show();
            this.authenticationService.getPermissions(profile).subscribe(
                success_rules => {
                    this.rules = success_rules;
                    this.loaderService.hide();
                    // PAGES
                    // this.accessPageService.getAllPages().subscribe(
                    //     success => {
                            // this.pages = success;
                            // for ( let i = 0; i < this.pages.length; i++) {
                            //     for ( let j = 0; j < this.rules.length; j++) {
                            //         if (this.pages[i].id === this.rules[j].page_id) {
                            //             this.rules[j].page_id = this.pages[i].route;
                            //             break;
                            //         }
                            //     }
                            // }
                            if (this.rules.length !== 0) {
                                this.rulesSubject.next(<RuleState>{permissions: this.rules});
                                for ( let i = 0; i < this.rules.length; i++) {
                                    if ( ('/' + this.rules[i].page.route ) === this.returnUrl) {
                                        if ( this.rules[i].read) {
                                            this.permissionsSubject.next(<RuleState>{
                                                canRead: this.rules[i].read,
                                                canCreate: this.rules[i].create,
                                                canUpdate: this.rules[i].update,
                                                canDelete: this.rules[i].delete
                                            });
                                            break;
                                        } else {
                                            this.permissionsSubject.next(<RuleState>{
                                                canRead: this.rules[i].read,
                                                canCreate: this.rules[i].create,
                                                canUpdate: this.rules[i].update,
                                                canDelete: this.rules[i].delete
                                            });
                                            // this.loaderService.hide();
                                        }
                                    }
                                }
                            }


                    //     },
                    //     error => console.log(error)
                    // );

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
                    // PAGES
                    // this.accessPageService.getAllPages().subscribe(
                    //     success => {
                    //         this.pages = success;
                    //         for ( let i = 0; i < this.pages.length; i++) {
                    //             for ( let j = 0; j < this.rules.length; j++) {
                    //                 if (this.pages[i].id === this.rules[j].page_id) {
                    //                     this.rules[j].page_id = this.pages[i].route;
                    //                     break;
                    //                 }
                    //             }
                    //         }
                    //         this.rulesSubject.next(<RuleState>{permissions: this.rules});
                    //     },
                    //     error => console.log(error)
                    // );

                }
            );
        }
      }

    ngOnDestroy(): void {
    }
  }

  export interface RuleState {
    permissions: Rule[];
    canRead: boolean;
    canUpdate: boolean;
    canCreate: boolean;
    canDelete: boolean;
  }
