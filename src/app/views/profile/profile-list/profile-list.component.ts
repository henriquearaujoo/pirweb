import { ToastService } from './../../../services/toast-notification/toast.service';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../../../services/profile/profile.service';
import { Profile } from '../../../models/profile';
import { PagenateComponent } from '../../../components/pagenate/pagenate.component';
import { PageService } from '../../../services/pagenate/page.service';
import { ProfilePipe } from './profile.pipe';
import { RuleService } from '../../../services/rule/rule.service';
import { Rule } from '../../../models/rule';
import { AccessPageService } from '../../../services/page/page.service';
import { Paginate } from '../../../models/paginate';
import { PageComponent } from '../page/page.component';


@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css'],
})
export class ProfileListComponent extends PagenateComponent implements OnInit, OnChanges {
   profiles: Profile[] = new Array();

    profile: Profile = new Profile();
    private paginate: Paginate = new Paginate();

    @Input() profile_id: number;

    @Output() page: number;

    public edit: boolean;

    @Input() selectedProfile: Profile = new Profile();

    hasdata: boolean;

    @ViewChild('page') pageComponent: PageComponent;

    filter: any = {title: ''};
    private profileTab: string;
    private permissionTab: string;
    private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};

    private profileTabActive: boolean;
    private permissionTabActive: boolean;
    // private currentTab: number;
    // private cont: number;

    constructor(
      pagerService: PageService,
      private profileService: ProfileService,
      private ruleService: RuleService,
      private accessPageService: AccessPageService,
      private toastService: ToastService,
      private router: Router) {
        super(pagerService);
        this.hasdata = false;
        this.edit = false;
        this.page = 0;
      }

      ngOnInit() {
        // this.currentTab = 0;
        // this.cont = 0;
        this.profileTab = '../../../assets/img/profile/ic_profile_enable.png';
        this.permissionTab = '../../../assets/img/profile/ic_permission_disable.png';
        this.profileTabActive = true;
        this.permissionTabActive = false;
        this.hasdata = false;
        this.getProfile();
      }

      ngOnChanges() {
      }

      getProfile() {
        if ( this.filter.title !== '') { this.page = 0; }
        this.profileService.getProfile(this.filter.title, this.page).subscribe(
          success => {
            this.paginate = success;
            this.profiles = this.paginate.content;
            console.log('Paginate:', this.paginate);
            this.hasdata = true;
          },
          error => this.hasdata = false
        );
      }

      setPage(page: number) {
        this.page = page;
        console.log('Página:', this.page);
        console.log('Paginate:', this.paginate);
        console.log('Filtro:', this.filter.title);
        this.getProfile();
      }

      setProfile(profile: Profile) {
        this.selectedProfile = profile;
        // localStorage.setItem('currentProfile', JSON.stringify(profile));
        this.accessPageService.profileSelected(profile);
        console.log(this.accessPageService.getProfile().title);
      }

      changeStatus(profile: Profile) {
        this.profile = profile;
      }

      disableProfile() {
        if (this.profile.status === true) {
          this.profile.status = false;
        } else {
          this.profile.status = true;
        }
        console.log(this.profile.status);

        this.profile.description = '';
        this.profile.created_by = '';
        this.profile.modified_by = '';
        console.log('Disable:', this.profile);
        this.profileService.disableProfile(this.profile).subscribe(
          success => {
            this.router.navigate(['profile-list']);
            this.getProfile();
            this.toastService.toastSuccess();
          },
          error => <any>error
        );
      }

      onInsertValue(evento: Profile) {
        this.profiles.push(evento);
        this.getProfile();
        this.filter.title = '';
        this.edit = false;
        this.pageComponent.getProfile();
      }

      onFilter(evento) {
        this.filter.title = evento.title;
      }

      editProfile(profile: Profile) {
        this.edit = true;
        this.selectedProfile = profile;
      }

      isActive(tab: boolean) {

      }

      walk ( tab: number) {
        switch (tab) {
          case 0: {
            this.profileTab = '../../../assets/img/profile/ic_profile_enable.png';
            this.permissionTab = '../../../assets/img/profile/ic_permission_disable.png';
            this.profileTabActive = true;
            this.permissionTabActive = false;
            break;
          }
          case 1: {
            if (this.accessPageService.getProfile().id !== undefined) {
              this.pageComponent.getCurrentProfile();
            }
            this.profileTab = '../../../assets/img/profile/ic_profile_disable.png';
            this.permissionTab = '../../../assets/img/profile/ic_permission_enable.png';
            this.profileTabActive = false;
            this.permissionTabActive = true;
          break;
          }
        }
      }

      walk_ ( tab: number, profile: Profile) {
        this.selectedProfile = profile;
        this.accessPageService.profileSelected(profile);

        if (this.accessPageService.getProfile().id !== undefined) {
            this.pageComponent.getCurrentProfile();
        }
        this.profileTab = '../../../assets/img/profile/ic_profile_disable.png';
        this.permissionTab = '../../../assets/img/profile/ic_permission_enable.png';
        this.profileTabActive = false;
        this.permissionTabActive = true;
      }
}
