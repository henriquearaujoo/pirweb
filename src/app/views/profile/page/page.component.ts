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

  pageAllowed: Page[] = new Array();

  pageSelected: Page[] = new Array();

  public rulesProfile: Rule[] = new Array();
  page_allowed: Page[] = new Array();
  public page_not_allowed: Page[] = new Array();
  public pages: Page[] = new Array();

  public selectedProfile: Profile = new Profile();
  public nameProfile: string;
  hasdata: boolean;

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
    this.getPagesAllowed();
    this.getPages();
   // this.getPagesDenied();
    this.selectedProfile = this.accessPageService.getProfile();
    this.nameProfile = this.selectedProfile.name;
  }

  ngOnChange() {
    console.log(this.page_not_allowed);
    this.getPagesAllowed();
  }

  getPagesAllowed() {
    this.rulesProfile = this.accessPageService.getProfile().rule;
    if (this.rulesProfile.length >= 0) {
      for (let i = 0; i < this.rulesProfile.length; i++) {
        this.accessPageService.getPagesAllowed(this.rulesProfile[i]).subscribe(
          sucess => {
            this.page_allowed.push(sucess);
            this.allItems = this.page_allowed;
            this.setPage(1);
            this.hasdata = true;
          },
          error => this.hasdata = false
        );
      }
    }
  }

  getPages() {
    this.accessPageService.getAllPages().subscribe(
      sucess => {
        this.page_not_allowed = sucess;
        console.log('Permissões ativas', this.page_allowed.length);
        console.log('sessões', this.page_not_allowed.length);
        for (let i = 0; i < this.page_allowed.length; i++) {
          for ( let j = 0; j < this.page_not_allowed.length; j++) {
            if (this.page_allowed[i].name === this.page_not_allowed[j].name) {
              console.log(this.page_not_allowed.splice(j));
              console.log('remove page', this.page_not_allowed);
            }
          }
        }
        this.allItems = this.page_not_allowed;
        this.setPage(1);
        this.hasdata = true;
      },
      error => this.hasdata = false
    );
  }

//  getPagesDenied() {
//     console.log('length page_allowed', this.page_allowed.length);
//     console.log('length page_not_allowed', this.page_not_allowed.length);

//     for (let i = 0; i < 8; i++) {
//       for ( let j = 0; j < 8; j++) {
//         if (this.page_allowed[i].name === this.page_not_allowed[j].name) {
//           this.page_not_allowed.splice(j);
//           console.log('remove page', this.page_not_allowed);
//         }
//       }
//     }
//   }

  updatePages(item, event) {
    console.log('event.target.value ' + event.target.value);
    const index = this.pageSelected.indexOf(item);
    if (event.target.selected) {
      console.log('insert');
      if ( index === -1) {
        this.pageSelected.push(item);
      }
    } else {
      console.log('remove');
      if ( index !== -1) {
        this.pageSelected.splice(index, 1);
      }
    }
    console.log(this.pageSelected);
  }

  setPages() {
    this.accessPageService.setPages(this.pageSelected);
    console.log('Páginas selecionadas service', this.accessPageService.getPages());
  }

  public removePermission() {

  }

}
