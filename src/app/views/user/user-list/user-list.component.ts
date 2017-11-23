import { element } from 'protractor';
import { Paginate } from './../../../models/paginate';
import { ToastService } from './../../../services/toast-notification/toast.service';
import { PageService } from './../../../services/pagenate/page.service';
import { User } from './../../../models/user';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
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
export class UserListComponent implements OnInit, OnDestroy {

  private users: User[] = new Array();
  private profile: Profile = new Profile();
  private profiles: Profile[] = new Array();
  hasdata: boolean;

  private user: User = new User();
  private paginate: Paginate = new Paginate();
  @Output() page: number;
  filter: any = {name: ''};

  constructor(
    private pagerService: PageService,
    private userService: UserService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router) {
      this.hasdata = false;
      this.page = 0;
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
    if ( this.filter.name !== '') { this.page = 0; }
    this.userService.getUsers(this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.users = success.content;
        console.log('show_msg', this.userService.show_msg);
        if (this.userService.show_msg) {
          this.toastService.toastSuccess();
          this.userService.show_msg = false;
        }
        this.profileService.getAllProfiles().subscribe(
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
            this.hasdata = true;
           },
           error => console.log(error)
        );

      },
      error => this.hasdata = false
    );
  }

  setPage(page: number) {
    this.page = page;
    console.log('Página:', this.page);
    console.log('Filtro:', this.filter.name);
    this.getUsers();
  }

  setUser(user) {
    this.userService.setUser(user);
  }

  changeStatus(user: User) {
    this.user = user;
    console.log(this.user);
    console.log(this.user.status);
  }

  disableAbleUser() {
    if (this.user.status === true) {
      this.user.status = false;
    } else {
      this.user.status = true;
    }
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
