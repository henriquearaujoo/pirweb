import { LoaderService } from './../../../services/loader/loader.service';
import { Rule } from './../../../models/rule';
import { error } from 'util';
import { ToastService } from './../../../services/toast-notification/toast.service';
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
import { AlertsService, AlertType } from '@jaspero/ng2-alerts';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent extends PagenateComponent implements OnInit {

  public selectedPages = new Array();
  private pageFromServer = new Array();
  private all_pages: Page[] = new Array();
  private all_pages_profile: Rule[] = new Array();
  private pagesFromProfile = new Array();
  private currentProfile: Profile = new Profile();
  private currentPage: Page = new Page();
  permissionsFromProfile: Rule[] = new Array();
  public page_allowed = new Array();

  private selected: any[] = new Array();
  private allowed_selected: any[] = new Array();
  private matPermissions: boolean[][];
  private confirm_rules: boolean;
  private paginate: Paginate = new Paginate();
  private profiles: Profile[] = new Array();
  private rule: Rule = new Rule();
  private options: any[] = [
    {'id': 1, 'rule': 'Criar'},
    {'id': 2, 'rule': 'Editar'},
    {'id': 3, 'rule': 'Visualizar'},
    {'id': 4, 'rule': 'Desabilitar'}
  ];
  private checked: any[] = new Array();
  private hasPermissions: boolean;
  @Input() insertValue: boolean;

  constructor(
    pagerService: PageService,
    private profileService: ProfileService,
    private accessPageService: AccessPageService,
    private ruleService: RuleService,
    private router: Router,
    private toastService: ToastService,
    private loaderService: LoaderService) {
      super(pagerService);
      this.permissionsFromProfile = new Array();
     }

  ngOnInit() {
    this.getProfile();
    this.hasPermissions = false;
    this.currentProfile = this.accessPageService.getProfile();
    this.currentPage.id = '';
    console.log('currentProfile', this.currentProfile.id);
    if ( this.currentProfile.id === undefined) {
      // this.currentProfile.id = '';
      // this.loadAllPages();
     } // else {
    //   this.loadPageFromProfile();
    // }
    this.loadAllPages();

  }

  ngOnChange() {}

  getCurrentProfile() {
    this.currentProfile = this.accessPageService.getProfile();
    this.loadAllPermissions();
  }

  getProfile() {
    this.profileService.getAllProfiles().subscribe(
      success => {
        // this.paginate = success;
        this.profiles = success;
        // console.log('Paginate:', this.paginate);
      },
      error => console.log(error)
    );
  }

  loadAllPages() {
    this.accessPageService.getAllPages().subscribe(
      s => {
        this.all_pages = s;
      },
      error => console.log(error)
    );
  }

  loadAllPermissions() {
    this.loaderService.show();
    this.accessPageService.getPermissionsFromProfile(this.accessPageService.getProfile().id).subscribe(
      s => {
        this.permissionsFromProfile = s;
        if (s.length > 0 ) {
          this.hasPermissions = true;
        }else {
          this.hasPermissions = false;
        }
        setTimeout( () => {
          this.loaderService.hide();
        }, 200);
      },
      error => {
        console.log(error);
        this.loaderService.hide();
      }
    );
  }

  loadPageFromProfile_() {
    this.profileService.getPages(this.accessPageService.getProfile().id).subscribe(
      s => {
        this.pagesFromProfile = s;
        console.log('loadPageFromProfile_', this.pagesFromProfile);

      },
      e => console.log(e)
    );
  }

  loadPageFromProfile() {
    this.profileService.getPages(this.accessPageService.getProfile().id).subscribe(
      s => {
        this.pagesFromProfile = s;
        console.log('loadPageFromProfile', this.pagesFromProfile);
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

  setProfile() {
    this.accessPageService.profileSelected(this.currentProfile);
    this.loadAllPermissions();
  }

  updatePermission(page: Page, option, event) {
    this.rule = new Rule();
    this.currentPage = page;
    this.all_pages_profile = new Array();
    this.accessPageService.getPagesFromProfile(this.currentProfile.id, this.currentPage.id).subscribe(
      success_page_profile => {
        this.all_pages_profile = success_page_profile;

        // * CHECKED * /
        console.log('event.target.value ' + event.target.value);
        const index = this.checked.indexOf(option);

        if (event.target.checked) {
          // if ( index === -1) {
            this.checked.push(option);
            switch (option) {
              case 1: {
                if (this.all_pages_profile.length > 0) {
                  this.all_pages_profile[0].read = true;
                  break;
                }
                this.rule.read = true;
                break;
              }
              case 2: {
                if (this.all_pages_profile.length > 0) {
                  this.all_pages_profile[0].create = true;
                  break;
                }
                this.rule.create = true;
                break;
              }
              case 3: {
                if (this.all_pages_profile.length > 0) {
                  this.all_pages_profile[0].update = true;
                  break;
                }
                this.rule.update = true;
                break;
              }
              case 4: {
                if (this.all_pages_profile.length > 0) {
                  this.all_pages_profile[0].delete = true;
                  break;
                }
                this.rule.delete = true;
                break;
              }
            }
          // }
        }  else {
          // if ( index !== -1) {
            this.checked.splice(index, 1);
            switch (option) {
              case 1: {
                if (this.all_pages_profile.length > 0) {
                  this.all_pages_profile[0].read = false;
                  break;
                }
                this.rule.read = false;
                break;
              }
              case 2: {
                if (this.all_pages_profile.length > 0) {
                  this.all_pages_profile[0].create = false;
                  break;
                }
                this.rule.create = false;
                break;
              }
              case 3: {
                if (this.all_pages_profile.length > 0) {
                  this.all_pages_profile[0].update = false;
                  break;
                }
                this.rule.update = false;
                break;
              }
              case 4: {
                if (this.all_pages_profile.length > 0) {
                  this.all_pages_profile[0].delete = false;
                  break;
                }
                this.rule.delete = false;
                break;
              }
            }
          // }
        }

        if (this.all_pages_profile.length > 0) {
          this.ruleService.editRule(this.all_pages_profile[0]).subscribe(
            s => {
              this.toastService.toastSuccess();
              },
              error => console.log(error)
          );
        } else {
              this.rule.profile_id = this.currentProfile.id;
              this.rule.page_id = this.currentPage.id;
              this.ruleService.saveRule(this.rule).subscribe(
                 s => {
                   this.toastService.toastSuccess();
                  },
                 error => console.log(error)
                 );
        }
      },
      error => console.log(error)
    );

  }
}
