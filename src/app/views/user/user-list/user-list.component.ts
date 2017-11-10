import { ToastService } from './../../../services/toast-notification/toast.service';
import { PageService } from './../../../services/pagenate/page.service';
import { User } from './../../../models/user';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { PagenateComponent } from '../../../components/pagenate/pagenate.component';
import { Profile } from '../../../models/profile';
import { ProfileService } from '../../../services/profile/profile.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends PagenateComponent implements OnInit, OnDestroy {

  private users: User[] = new Array();
  private profile: Profile = new Profile();
  private profiles: Profile[] = new Array();
  hasdata: boolean;

  private user: User = new User();

  filter: User = new User();

  constructor(
    pagerService: PageService,
    private userService: UserService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router) {
      super(pagerService);
      this.hasdata = false;
     }

  ngOnInit() {
    this.hasdata = false;
    this.getUsers();
    this.userService.disable.subscribe(
      success => {
        console.log('Desabilitado: ', success);
        this.users = this.users.filter( user => user.id !== success.id);
        this.getUsers();
      }
    );
  }

  ngOnChange() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      success_users => {
        this.users = success_users;
        this.profileService.getProfiles().subscribe(
          success_profiles => {
            this.profiles = success_profiles;
            this.users.forEach( user => {
              this.profiles.forEach( profile => {
                if ( user.profile === profile.id) {
                  user.profile = profile.title;
                }
              });
              }
            );
            this.allItems = this.users;
            this.setPage(1);
            this.hasdata = true;
           },
           error => console.log(error)
        );

      },
      error => this.hasdata = false
    );
  }

  setUser(user) {
    this.userService.setUser(user);
  }

  deleteUser(user: User) {
    this.user = user;
    console.log(this.user);
  }

  disableUser() {
    console.log(this.user.status);
    this.user.status = false;
    console.log(this.user.status);

    this.profileService.getProfiles().subscribe(
      success_profiles => {
        this.profiles = success_profiles;
        this.profiles.forEach( profile => {
          if (this.user.profile === profile.title) {
            this.user.profile = profile.id;
          }
        });

        this.userService.disableUser(this.user).subscribe(
          success => {
            this.getUsers();
            this.toastService.toastSuccess();
          },
          error => console.log(error)
        );
      }
    );
    console.log(this.user);
  }

  ngOnDestroy() {

  }

}
