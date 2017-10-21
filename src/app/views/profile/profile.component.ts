import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../../services/profile/profile.service';
import { Profile } from '../../models/Profile';
import { PagenateComponent } from '../../components/pagenate/pagenate.component';
import { PageService } from '../../services/pagenate/page.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends PagenateComponent implements OnInit{

  profiles: Profile[] = new Array();
  profile: Profile = new Profile();
  hasdata: boolean;
  profileFilter: any = { name: '' };

  key = 'name';
  reverse = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(    
    pagerService: PageService,
    private profileService: ProfileService,
    private router: Router) {
      super(pagerService);
      this.hasdata = false;
    }
  
    ngOnInit() {
      this.getProfile();
      
    }

    getProfile(){
      this.profileService.getProfiles().subscribe(
        success => {
          this.profiles = success;
          this.allItems = this.profiles;
          this.setPage(1);
          this.hasdata = true;
        },
        error => this.hasdata = false
      );
      console.log(this.profiles)
    }

    save(){
      this.profileService.updateProfile(this.profile).subscribe(
        success => {
          this.profile = success
        },
        error => <any>error
      ); 
    }
}