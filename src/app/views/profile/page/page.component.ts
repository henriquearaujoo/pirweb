import { RuleService } from './../../../services/rule/rule.service';
import { Headers } from '@angular/http';
import { PagenateComponent } from './../../../components/pagenate/pagenate.component';
import { AccessPageService } from './../../../services/page/page.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Page } from '../../../models/page';
import { PageService } from '../../../services/pagenate/page.service';
import { Router } from '@angular/router';
import { Profile } from '../../../models/profile';
import { RuleProfile } from '../../../models/rule-profile';
import { ProfileService } from '../../../services/profile/profile.service';

import * as _ from 'underscore';
import { Rule } from '../../../models/rule';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent extends PagenateComponent implements OnInit {

 // pages: Page[] = new Array();

  // pageAllowed: Page[] = new Array();

  public selectedPages = new Array();
  private pageFromServer = new Array();
  private pagesFromProfile = new Array();
  public currentProfile: Profile = new Profile();
  public page_allowed = new Array();

  constructor(
    pagerService: PageService,
    private profileService: ProfileService,
    private accessPageService: AccessPageService,
    private ruleService: RuleService,
    private router: Router) {
      super(pagerService);
     }

  ngOnInit() {
    this.loadPageFromProfile();
    this.currentProfile = this.accessPageService.getProfile();
  }

  ngOnChange() {
    this.loadPageFromProfile();
  }

  loadPageFromProfile() {
    this.profileService.getPages(this.accessPageService.getProfile().id).subscribe(
      s => {
        this.pagesFromProfile = s;
        this.accessPageService.getAllPages().subscribe(
          s2 => {
            this.pageFromServer = s2;
            for ( let i = 0 ; i < this.pagesFromProfile.length; i++) {
              for (let j = 0 ; j < this.pageFromServer.length; j++) {
                if ( this.pagesFromProfile[i].route === this.pageFromServer[j].route) {
                  this.pageFromServer.splice(j, 1);
                }
              }
            }
          },
          e2 => {
            console.log(e2);
          }
        );
      },
      e => console.log(e)
    );
  }
  onReloadPage(event) {
    this.loadPageFromProfile();
    console.log(event);
  }

  setPages() {
    if ( this.selectedPages.length > 0) {
      this.accessPageService.setPages(this.selectedPages);
    }else {

    }
    // console.log('Páginas selecionadas service', this.accessPageService.getPages());
  }

  public removePages() {
    for (let i = 0; i < this.page_allowed.length ; i++) {
      this.ruleService.deleteRule(this.page_allowed[i].rules[0].id).subscribe(
        s => {
          this.loadPageFromProfile();
          console.log('removed:' + this.page_allowed[i].rules[0].id)
        },
        e => {
          this.loadPageFromProfile();
          console.log('can`t remove the register' + this.page_allowed[i].rules[0].id)
        }
      );
    }
  }

}
