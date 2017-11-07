import { PageService } from './../../services/pagenate/page.service';
import { User } from './../../models/user';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagenateComponent } from '../../components/pagenate/pagenate.component';
import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile/profile.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends PagenateComponent implements OnInit, OnDestroy {

  private users: User[] = new Array();
  private profile: Profile = new Profile();
  hasdata: boolean;
  subscribe: Subscription;

  filter: User = new User();

  constructor(
    pagerService: PageService,
    private userService: UserService,
    private profileService: ProfileService) {
      super(pagerService);
      this.hasdata = false;
     }

  ngOnInit() {
    this.hasdata = false;
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      success => {
        this.users = success;
        this.allItems = this.users;
        this.setPage(1);
        this.hasdata = true;
      },
      error => this.hasdata = false
    );
  }

  getProfile(profile_id: string): string {
    this.subscribe = this.profileService.getProfileWithParam(profile_id).subscribe(
      success => {
        this.profile = success;
        this.hasdata = true;
      },
      error => this.hasdata = false
    );
    //this.subscribe.unsubscribe();
    return this.profile.title;
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}
