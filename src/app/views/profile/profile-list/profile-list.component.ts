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

    @Input() newProfile: Profile[] = new Array();

    selectedProfile: Profile[] = new Array();

    hasdata: boolean;

    profileFilter: any = {name: ''};
    key = 'name';
    reverse = false;

    // search() {
    //   if (this.pagedItems.length === 0 ||
    //     this.pagedItems === undefined ||
    //     this.profileFilter.name === null ||
    //     this.profileFilter.name === undefined
    //     || this.profileFilter.name === '') {
    //     return this.pagedItems;
    //   }
    //   if (this.profileFilter !== '') {
    //   return this.pagedItems.filter((v) => {
    //     if (v.indexOf(this.profileFilter.name) >= 0) {
    //       return true;
    //     }
    //     return false;
    //   });
    // }
    // }

    sort(key) {
      this.key = key;
      this.reverse = !this.reverse;
    }
    constructor(
      pagerService: PageService,
      private profileService: ProfileService,
      private ruleService: RuleService,
      private accessPageService: AccessPageService,
      private router: Router) {
        super(pagerService);
        this.hasdata = false;
      }

      ngOnInit() {
        console.log(this.newProfile);
        this.hasdata = false;
        this.getProfile();
      }

      ngOnChanges() {
        this.profiles = this.newProfile;
        this.getProfile();
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
        this.accessPageService.profileSelected(profile);
      }

      deleteProfile(profileId: number) {
        this.profileService.deleteProfile(profileId.toString()).subscribe(
          success => {}
        );
      }
}
