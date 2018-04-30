import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
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
import { Person } from '../../../models/person';
import { Org } from '../../../models/org';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private users: User[] = new Array();
  private person: Person = new Person();
  private org: Org = new Org();
  private profile: Profile = new Profile();
  private profiles: Profile[] = new Array();
  hasdata: boolean;
  private user: User = new User();
  private paginate: Paginate = new Paginate();
  @Output() page: number;
  filter: any = {name: ''};
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private pattern = '^[a-zA-Z';

  constructor(
    private pagerService: PageService,
    private userService: UserService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router,
    private permissions: Permissions,
    private loaderService: LoaderService) {
      this.filter.name = '';
      this.hasdata = false;
      this.page = 0;
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
     }

  ngOnInit() {
    this.hasdata = false;
    this.getUsers();
    localStorage.removeItem('userId');
    this.permissions.canActivate(['/usuarios']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
  }

  ngOnChange() {
    this.getUsers();
  }

  getUsers() {
    if ( this.filter.name !== '') { this.page = 0; }
    this.loaderService.show();
    this.userService.getUsers(this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.users = success.content;
        this.hasdata = true;
        setTimeout(() => {
          this.loaderService.hide();
        }, 400);
      },
      error => {
        this.loaderService.hide();
        this.hasdata = false;
      }
    );
  }

  setPage(page: number) {
    this.page = page;
    this.getUsers();
  }

  setUser(user: User) {
    this.userService.setUser(user);
    localStorage.setItem('userId', user.id);
  }

  changeStatus(user: User) {
    this.user = user;
  }

  disableEnableUser() {
    if (this.user.status === true) {
      this.user.status = false;
    } else {
      this.user.status = true;
    }
    this.user.profile_id = this.user.profile.id;
    this.user.address.city_id = this.user.address.city.id;
    this.userService.saveEditUser(this.user).subscribe(
      s_org => {
        this.getUsers();
        this.toastService.toastSuccess();
      },
      error => {
        console.log(error);
        this.toastService.toastError();
      }
    );
  }
}
