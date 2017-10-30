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
  // public rulesProfile: Rule[] = new Array();
  // public page_allowed: Page[] = new Array();
  // public page_not_allowed: Page[] = new Array();
  // public pages: Page[] = new Array();

  public currentProfile: Profile = new Profile();
  // public nameProfile: string;
  // hasdata: boolean;

  constructor(
    pagerService: PageService,
    private profileService: ProfileService,
    private accessPageService: AccessPageService,
    private router: Router) {
      super(pagerService);
     }

  ngOnInit() {
    this.loadPages();
    this.currentProfile = this.accessPageService.getProfile();
  }

  ngOnChange() {

  }

  loadPages() {
    this.accessPageService.getAllPages().subscribe(
      s => {
        this.pageFromServer = s;
      },
      e => {
        console.log(e);
      }
    );
  }

  setPages() {
    if ( this.selectedPages.length > 0) {
      this.accessPageService.setPages(this.selectedPages);
    }else {

    }
    // console.log('Páginas selecionadas service', this.accessPageService.getPages());
  }

  public removePermission() {

  }

}
