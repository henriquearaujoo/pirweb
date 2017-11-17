import { ToastService } from './../../../services/toast-notification/toast.service';
import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../../../services/profile/profile.service';
import { Profile } from '../../../models/profile';
import { PagenateComponent } from '../../../components/pagenate/pagenate.component';
import { PageService } from '../../../services/pagenate/page.service';
import { ProfilePipe } from './profile.pipe';
import { RuleService } from '../../../services/rule/rule.service';
import { Rule } from '../../../models/rule';
import { AccessPageService } from '../../../services/page/page.service';


@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css'],
})
export class ProfileListComponent extends PagenateComponent implements OnInit, OnChanges {
   profiles: Profile[] = new Array();

    @Input() profile: Profile = new Profile();

    @Input() profile_id: number;

    public edit: boolean;

    @Input() selectedProfile: Profile = new Profile();

    hasdata: boolean;

    filter: Profile = new Profile();

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
      }

      ngOnInit() {
        this.hasdata = false;
        this.getProfile();
      }

      ngOnChanges() {
      }

      getProfile() {
        this.profileService.getProfiles().subscribe(
          success => {
            this.profiles = success;
            this.allItems = this.profiles;
            this.setPage(1);
            this.hasdata = true;
          },
          error => this.hasdata = false
        );
      }

      setProfile(profile: Profile) {
        localStorage.setItem('currentProfile', JSON.stringify(profile));
        this.accessPageService.profileSelected(profile);
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
      }

      onFilter(evento) {
        this.filter.title = evento.title;
      }

      editProfile(profile: Profile) {
        this.edit = true;
        this.selectedProfile = profile;
      }
}
