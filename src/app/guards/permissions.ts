import { State } from './../models/states';
import { AuthenticationService } from './../services/login/authentication.service';
import { AccessPageService } from './../services/page/page.service';
import { Page } from './../models/page';
import { Rule } from '../models/rule';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class Permissions implements OnDestroy {
    private rules: Rule[] = new Array();
    private rules2: Rule[] = new Array();
    private pages: Page[] = new Array();
    isActivate: boolean;
    returnUrl: string;

    constructor(
        private authenticationService: AuthenticationService,
        private accessPageService: AccessPageService) {
            this.isActivate = false;
        }

    canActivate(url: string) {
        this.returnUrl = url;

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

                            if (this.rules.length !== 0) {
                                console.log('TEST');
                                for ( let i = 0; i < this.rules.length; i++) {
                                    console.log('URL', this.returnUrl);
                                    if ( ('/' + this.rules[i].page_id ) === this.returnUrl) {
                                        console.log('TEST 2');
                                        if ( this.rules[i].read) {
                                            console.log('Pode ativar rota!');
                                            this.isActivate = true;
                                            break;
                                        } else {
                                            console.log('Não pode ativar rota!');
                                            this.isActivate = false;
                                            break;
                                        }
                                    }
                                }
                            }


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
        this.isActivate.valueOf();
    }
  // tslint:disable-next-line:eofline
  }