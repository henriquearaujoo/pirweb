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

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent extends PagenateComponent implements OnInit {

  pages: Page[] = new Array();
  pageAllowed: Page[] = new Array();

  public rulesProfile: any[] = new Array();
  public page_allowed = new Array();
  public page_not_allowed = new Array();
  public selectedProfile: Profile = new Profile();
  public nameProfile: string;
  hasdata: boolean;

  private modals: any[] = [];

  constructor(
    pagerService: PageService,
    private profileService: ProfileService,
    private accessPageService: AccessPageService,
    private router: Router) {
      super(pagerService);
      this.hasdata = false;
     }

  ngOnInit() {
    this.hasdata = false;
    this.rulesProfile = [];
    this.getPagesDenied();
    this.selectedProfile = this.accessPageService.getProfile();
    this.nameProfile = this.selectedProfile.name;
    console.log('Perfil retornado do serviço', this.selectedProfile);
  }

  getPagesDenied() {
    this.accessPageService.getPagesDenied().subscribe(
      sucess => {
        this.page_not_allowed = sucess;
        this.allItems = this.page_not_allowed;
        this.setPage(1);
        this.hasdata = true;
      },
      error => this.hasdata = false
    );
  }
  public removePermission() {

  }

  public openModal(id: string) {}
}
