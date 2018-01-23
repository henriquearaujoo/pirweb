import { State } from './../models/states';
import { AuthenticationService } from './../services/login/authentication.service';
import { AccessPageService } from './../services/page/page.service';
import { Page } from './../models/page';
import { Rule } from '../models/rule';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class Permissions implements OnDestroy {
    private rules: Rule[] = new Array();
    private permissions: Rule[];
    private pages: Page[] = new Array();

    canRead = Observable.of(false);
    returnUrl: string;
    private rulesSubject = new Subject<RuleState>();
    ruleState = this.rulesSubject.asObservable();

    private permissionsSubject = new Subject<RuleState>();
    permissionsState = this.permissionsSubject.asObservable();

    constructor(
        private authenticationService: AuthenticationService,
        private accessPageService: AccessPageService,
        private  router: Router) {
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
                                // console.log('TEST', this.rules);
                                for ( let i = 0; i < this.rules.length; i++) {
                                    // console.log('URL', this.returnUrl);
                                    if ( ('/' + this.rules[i].page_id ) === this.returnUrl) {
                                        // console.log('TEST 2');
                                        if ( this.rules[i].read) {
                                            console.log('Pode ativar rota!');
                                            // this.canRead = true;
                                            this.canRead = Observable.of(true);
                                            this.permissionsSubject.next(<RuleState>{
                                                canRead: this.rules[i].read,
                                                canCreate: this.rules[i].create,
                                                canUpdate: this.rules[i].update,
                                                canDelete: this.rules[i].delete
                                            });
                                            break;
                                        } else {
                                            // this.canRead = false;
                                            this.canRead = Observable.of(false);
                                            console.log('Não pode ativar rota!');
                                            this.router.navigate(['/home']);
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
                            // localStorage.setItem('rulesProfile', JSON.stringify(this.rules));
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

    ngOnDestroy(): void {
    }
  }

  export interface RuleState {
    permissions: Rule[];
    canRead: boolean;
    canUpdate: boolean;
    canCreate: boolean;
    canDelete: boolean;
  // tslint:disable-next-line:eofline
  }