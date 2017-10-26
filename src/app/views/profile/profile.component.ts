import {Component, OnInit, OnChanges} from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../../services/profile/profile.service';
import { Profile } from '../../models/profile';
import { PagenateComponent } from '../../components/pagenate/pagenate.component';
import { PageService } from '../../services/pagenate/page.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends PagenateComponent implements OnInit, OnChanges {

  profiles: Profile[] = new Array();
  profile: Profile = new Profile();
  hasdata: boolean;

  constructor (
    pagerService: PageService,
    private profileService: ProfileService,
    private router: Router) {
      super(pagerService);
      this.hasdata = false;
    }

    ngOnInit() { }

    ngOnChanges() {
      this.profiles = new Array();
      this.hasdata = false;
    }

    save() {
      this.profileService.saveProfile(this.profile).subscribe(
        success => {
          this.profile = success;
        },
        error => <any>error
      );
    }
}