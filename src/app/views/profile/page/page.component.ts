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
import swal from 'sweetalert2';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent extends PagenateComponent implements OnInit {

  private all_pages: Page[] = new Array();
  private all_pages_profile: Rule[] = new Array();
  private pagesFromProfile = new Array();
  private currentProfile: Profile = new Profile();
  private currentPage: Page = new Page();
  permissionsFromProfile: Rule[] = new Array();
  public page_allowed = new Array();

  private profiles: Profile[] = new Array();
  private rule: Rule = new Rule();

  private checked: any[] = new Array();
  private hasPermissions: boolean;
  @Input() insertValue: boolean;
  private isAllChecked: boolean;
  filter: any = {name: ''};

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
    this.loadAllPages();

  }

  getCurrentProfile() {
    this.currentProfile = this.accessPageService.getProfile();
    this.loadAllPermissions();
  }

  getProfile() {
    this.profileService.getAllProfiles().subscribe(
      success => {
        this.profiles = success;
        this.profiles = this.profiles.filter( elem => elem.title.toUpperCase() !== 'ADMINISTRATOR');
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
    this.accessPageService.getPermissionsFromProfile(this.accessPageService.getProfile().id, this.filter.name).subscribe(
      s => {
        this.permissionsFromProfile = s;
        this.isAllChecked = true;
        for (let i = 0; i < this.permissionsFromProfile.length; i++) {
          if ( (this.permissionsFromProfile[i].create === false) ||
             (this.permissionsFromProfile[i].delete === false) ||
             (this.permissionsFromProfile[i].read === false) ||
             (this.permissionsFromProfile[i].update === false)
            ) {
              this.isAllChecked = false;
              break;
          }
        }
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
        this.all_pages_profile[0].page.rules = new Array();
        this.all_pages_profile[0].profile.description = '';
        this.all_pages_profile[0].profile.updated_at = '';
        // * CHECKED * /
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
        }  else {
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

  updateAllPermission(event) {
    this.rule = new Rule();
    this.accessPageService.getPermissionsFromProfile(this.currentProfile.id).subscribe(
      success => {
        this.all_pages_profile = success;
        // * CHECKED * /
        if (event.target.checked) {
          for (let i = 0; i < this.all_pages_profile.length; i++) {
            this.all_pages_profile[i].create = true;
            this.all_pages_profile[i].delete = true;
            this.all_pages_profile[i].read = true;
            this.all_pages_profile[i].update = true;
          }
        } else {
          for (let i = 0; i < this.all_pages_profile.length; i++) {
            this.all_pages_profile[i].create = false;
            this.all_pages_profile[i].delete = false;
            this.all_pages_profile[i].read = false;
            this.all_pages_profile[i].update = false;
          }
        }

        for (let i = 0; i < this.all_pages_profile.length; i++) {
          this.ruleService.editRule(this.all_pages_profile[i]).subscribe(
            s => {
              this.loadAllPermissions();
            },
            error => {
              console.log(error);
              this.toastService.toastError();
            }
          );
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  checkAll(event) {
    if (event.target.checked) {
      swal({
        title: 'Atenção',
        text: 'Atribuir todas as permissões ao perfil?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.updateAllPermission(event);
          swal(
            'Sucesso!',
            'Todas as permissões foram atribuídas.',
            'success'
          );
        } else {
          this.isAllChecked = false;
        }
      });
    } else {
      swal({
        title: 'Atenção',
        text: 'Remover todas as permissões do perfil?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.updateAllPermission(event);
          swal(
            'Sucesso!',
            'Todas as permissões foram removidas.',
            'success'
          );
        } else {
          this.isAllChecked = true;
        }
      });
    }
  }
}
