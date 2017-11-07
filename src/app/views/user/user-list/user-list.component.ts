import { PageService } from './../../../services/pagenate/page.service';
import { User } from './../../../models/user';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { PagenateComponent } from '../../../components/pagenate/pagenate.component';
import { Profile } from '../../../models/profile';
import { ProfileService } from '../../../services/profile/profile.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends PagenateComponent implements OnInit, OnDestroy {

  private users: User[] = new Array();
  private users2: User[] = new Array();
  private profile: Profile = new Profile();
  private profiles: Profile[] = new Array();
  hasdata: boolean;

  private user_details = new EventEmitter();

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

  // getUsers() {
  //   this.userService.getUsers().subscribe(
  //     success => {
  //       this.users = success;
  //       this.allItems = this.users;
  //       this.setPage(1);
  //       this.hasdata = true;
  //     },
  //     error => this.hasdata = false
  //   );
  // }

  getUsers() {
    this.userService.getUsers().subscribe(
      success => {
        this.users = success;
        this.profileService.getProfiles().subscribe(
          success2 => {
            this.profiles = success2;
            this.users.forEach( user => {
              this.profiles.forEach( profile => {
                if ( user.profile === profile.id) {
                  user.profile = profile.title;
                }
              });
              this.users2.push(user);
              }
            );
            this.allItems = this.users2;
            this.setPage(1);
            this.hasdata = true;
           },
           error => console.log(error)
        );

      },
      error => this.hasdata = false
    );
  }

  setUser(user: User) {
    this.userService.setUser(user);
  }

  ngOnDestroy() {

  }

}
