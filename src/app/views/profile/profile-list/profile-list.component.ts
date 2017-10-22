import {Component, OnInit, OnChanges} from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../../../services/profile/profile.service';
import { Profile } from '../../../models/profile';
import { PagenateComponent } from '../../../components/pagenate/pagenate.component';
import { PageService } from '../../../services/pagenate/page.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent extends PagenateComponent implements OnInit, OnChanges{
  
    profiles: Profile[] = new Array();
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
  
      ngOnChanges(){
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
  
}
