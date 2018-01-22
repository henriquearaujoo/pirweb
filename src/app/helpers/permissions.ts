import { State } from './../models/states';
import { AuthenticationService } from './../services/login/authentication.service';
import { AccessPageService } from './../services/page/page.service';
import { Page } from './../models/page';
import { Rule } from '../models/rule';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Permissions implements OnDestroy {
    private rules: Rule[] = new Array();
    private permissions: Rule[];
    private pages: Page[] = new Array();
    canRead = Observable.of(false);

    canUpdate: boolean;
    canCreate: boolean;
    canDelete: boolean;
    returnUrl: string;
    private rulesSubject = new Subject<RuleState>();
    ruleState = this.rulesSubject.asObservable();

    private permissionsSubject = new Subject<RuleState>();
    permissionsState = this.permissionsSubject.asObservable();

    constructor(
        private authenticationService: AuthenticationService,
        private accessPageService: AccessPageService) {
            // this.canRead = false;
            this.canUpdate = false;
            this.canCreate = false;
            this.canDelete = false;
        }

    canActivate(url: string): Observable<boolean> {
        this.returnUrl = url;

        const profile = localStorage.getItem('profileId_rules');
        // this.canRead = false;

        if (profile !== undefined || profile !== null) {
            this.authenticationService.getPermissions(profile).subscribe(
                success_rules => {
                    this.rules = success_rules;
                    console.log('RULES:', this.rules);
                    // PAGES
                    this.accessPageService.getAllPages().subscribe(
                        success => {
                            this.pages = success;
                            console.log('RULES 1:', this.rules);
                            console.log('PAGES:', this.pages);
                            for ( let i = 0; i < this.pages.length; i++) {
                                for ( let j = 0; j < this.rules.length; j++) {
                                    if (this.pages[i].id === this.rules[j].page_id) {
                                        this.rules[j].page_id = this.pages[i].route;
                                        break;
                                    }
                                }
                            }
                            this.rulesSubject.next(<RuleState>{permissions: this.rules});
                            if (this.rules.length !== 0) {
                                console.log('TEST', this.rules);
                                for ( let i = 0; i < this.rules.length; i++) {
                                    console.log('URL', this.returnUrl);
                                    if ( ('/' + this.rules[i].page_id ) === this.returnUrl) {
                                        console.log('TEST 2');
                                        if ( this.rules[i].read) {
                                            console.log('Pode ativar rota!');
                                            // this.canRead = true;
                                            this.canRead = Observable.of(true);
                                            this.permissionsSubject.next(<RuleState>{canRead: true});
                                            if ( this.rules[i].create) {
                                                this.canCreate = true;
                                            }
                                            if ( this.rules[i].update) {
                                                this.canUpdate = true;
                                            }
                                            if ( this.rules[i].delete) {
                                                this.canDelete = true;
                                            }
                                            break;
                                        } else {
                                            // this.canRead = false;
                                            this.canRead = Observable.of(false);
                                            console.log('Não pode ativar rota!');
                                            // this.permissionsSubject.next(<RuleState>{canRead: false});
                                            break;
                                        }
                                    }
                                }
                                // this.canRead = false;
                            }


                        },
                        error => console.log(error)
                    );

                }
            );
        }
        return this.canRead;
        // return this.isActivate;
        // console.log('RETURN', this.getPermissions());
      }

      setPermission(_rules: Rule[]) {
        console.log('RULES setPermissions:', _rules);
        this.permissions = _rules;
        this.rulesSubject.next(<RuleState>{permissions: _rules});
      }

      getPermissions(): Rule[] {
        console.log('RULES getPermissions:', this.permissions);
          return this.permissions;
      }

      getPermission() {
        // this.returnUrl = url;

        const profile = localStorage.getItem('profileId_rules');
        // this.isActivate = false;

        if (profile !== undefined || profile !== null) {
            this.authenticationService.getPermissions(profile).subscribe(
                success_rules => {
                    this.rules = success_rules;
                    console.log('RULES:', this.rules);
                    // PAGES
                    this.accessPageService.getAllPages().subscribe(
                        success => {
                            this.pages = success;
                            console.log('RULES 1:', this.rules);
                            console.log('PAGES:', this.pages);
                            for ( let i = 0; i < this.pages.length; i++) {
                                for ( let j = 0; j < this.rules.length; j++) {
                                    if (this.pages[i].id === this.rules[j].page_id) {
                                        this.rules[j].page_id = this.pages[i].route;
                                        break;
                                    }
                                }
                            }
                            this.rulesSubject.next(<RuleState>{permissions: this.rules});
                            localStorage.setItem('rulesProfile', JSON.stringify(this.rules));
                            // console.log('RULES setPermission:', this.rules);
                        },
                        error => console.log(error)
                    );

                }
            );
        }
        // return this.isActivate;
        // console.log('RETURN', this.getPermissions());
      }

    // getPermissions(): boolean {
    //     const profile = localStorage.getItem('profileId_rules');
    //     let state = false;
    //     console.log('returnUrl', this.returnUrl);
    //     if (profile !== undefined || profile !== null) {
    //         this.authenticationService.getPermissions(profile).subscribe(
    //             success_rules => {
    //                 this.rules = success_rules;
    //                 console.log('RULES:', this.rules);
    //                 state =  this.getPages();

    //             }
    //         );
    //     }
    //     return state;
    // }

    // getPages(): boolean {
    //     let state = false;
    //     this.accessPageService.getAllPages().subscribe(
    //         success => {
    //             this.pages = success;
    //             console.log('RULES 1:', this.rules);
    //             console.log('PAGES:', this.pages);
    //             for ( let i = 0; i < this.pages.length; i++) {
    //                 for ( let j = 0; j < this.rules.length; j++) {
    //                     if (this.pages[i].id === this.rules[j].page_id) {
    //                         this.rules[j].page_id = this.pages[i].route;
    //                         break;
    //                     }
    //                 }
    //             }

    //             if (this.rules.length !== 0) {
    //                 console.log('TEST');
    //                 for ( let i = 0; i < this.rules.length; i++) {
    //                     console.log('URL', this.returnUrl);
    //                     if ( ('/' + this.rules[i].page_id ) === this.returnUrl) {
    //                         console.log('TEST 2');
    //                         if ( this.rules[i].read) {
    //                             console.log('Pode ativar rota!');
    //                             state = true;
    //                         } else {
    //                             console.log('Não pode ativar rota!');
    //                             state = false;
    //                         }
    //                     }
    //                 }
    //             }


    //         },
    //         error => console.log(error)
    //     );
    //     return state;
    // }
  // tslint:disable-next-line:eofline
    ngOnDestroy(): void {
    }
  // tslint:disable-next-line:eofline
  }

  export interface RuleState {
    permissions: Rule[];
    canRead: boolean;
  }