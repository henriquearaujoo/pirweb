import { Paginate } from './../../../models/paginate';
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
import { AlertsService, AlertType } from '@jaspero/ng2-alerts';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent extends PagenateComponent implements OnInit {

  public selectedPages = new Array();
  private pageFromServer = new Array();
  private pagesFromProfile = new Array();
  public currentProfile: Profile = new Profile();
  public page_allowed = new Array();

  private selected: any[] = new Array();
  private allowed_selected: any[] = new Array();
  private confirm_rules: boolean;
  private paginate: Paginate = new Paginate();
  private profiles: Profile[] = new Array();

  constructor(
    pagerService: PageService,
    private profileService: ProfileService,
    private accessPageService: AccessPageService,
    private ruleService: RuleService,
    private router: Router) {
      super(pagerService);
     }

  ngOnInit() {
    this.getProfile();
    this.loadPageFromProfile();
    this.currentProfile = this.accessPageService.getProfile();
  }

  ngOnChange() {
    this.loadPageFromProfile();
  }

  getProfile() {
    this.profileService.getProfile().subscribe(
      success => {
        this.paginate = success;
        this.profiles = this.paginate.content;
        console.log('Paginate:', this.paginate);
      },
      error => console.log(error)
    );
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

  updateSelected(option, event) {
    console.log('event.target.value ' + event.target.value);
    const index = this.selected.indexOf(option);
    if (event.target.selected) {
      console.log('insert');
      if ( index === -1) {
        this.selected.push(option);
      }
    } else {
      console.log('delete');
      if ( index !== -1) {
        if ( ((index === 0) && (this.selected.length === 1))  ||
        ((index >= 1) && (this.selected.length >= 1)) ) {
          console.log('index delete []:', index);
          console.log('selected.length:', this.selected.length);
          this.selected = [];
        }
        this.selected.splice(index, 1);
        console.log('index delete', index);
      }
    }
    console.log('Selected', this.selected);
  }

  updateAllowedSelected(option, event) {
    const index = this.allowed_selected.indexOf(option);
    console.log('i index:', index);
    if (event.target.selected) {
      console.log('insert');
      if ( index === -1) {
        this.allowed_selected.push(option);
      }
    } else {
      console.log('delete');
      if ( index !== -1) {
        if ( ((index === 0) && (this.allowed_selected.length === 1))  ||
           ((index >= 1) && (this.allowed_selected.length >= 1)) ) {
          console.log('index delete []:', index);
          console.log('allowed_selected.length:', this.allowed_selected.length);
          this.allowed_selected = [];
        }
        this.allowed_selected.splice(index, 1);
        console.log('index delete', index);
      }
    }
    console.log('Allowed Selected', this.allowed_selected);
  }

  confirmRules(confirm: boolean) {
    this.confirm_rules = confirm;
    if ( this.confirm_rules) {
      this.selected = [];
      this.allowed_selected = [];
      this.confirm_rules = false;
    }
  }

  setPages() {
    if ( this.selectedPages.length > 0) {
      this.accessPageService.setPages(this.selectedPages);
    }
  }

  public removePages() {
    for (let i = 0; i < this.page_allowed.length ; i++) {
      this.ruleService.deleteRule(this.page_allowed[i].rules[0].id).subscribe(
        s => {
          this.loadPageFromProfile();
          console.log('removed:' + this.page_allowed[i].rules[0].id);
        },
        e => {
          this.loadPageFromProfile();
          console.log('can`t remove the register' + this.page_allowed[i].rules[0].id);
        }
      );
    }
    this.allowed_selected = [];
    this.selected = [];
  }

}
