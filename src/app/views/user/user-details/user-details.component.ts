import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { City } from './../../../models/city';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { User } from '../../../models/user';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from '../../../services/profile/profile.service';
import { Profile } from '../../../models/profile';
import { ToastService } from '../../../services/toast-notification/toast.service';
import { Address } from '../../../models/address';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private user: User;
  show_pjur: boolean;
  private profiles: Profile[] = new Array();
  private profile: Profile = new Profile();
  private cities: City[];
  private city_id: number;
  private state_id: string;
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private urlId: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private url: string;
  private accountTab: string;
  private personalTab: string;
  private adressTab: string;
  @Input() isAgent: boolean;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router,
    private permissions: Permissions,
    private loaderService: LoaderService ) {
    this.user = new User();
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
  }

  ngOnInit() {
    this.permissions.canActivate(['/user-details', '/agent-details']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.show_pjur = false;
    this.urlId = localStorage.getItem('userId');
    if (this.urlId !== undefined || this.urlId !== '') {
      this.loadUser();
    }

    const state: RouterState = this.router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    this.url = snapshot.url;

    this.accountTab = './assets/img/user/ic_account_enable.png';
    this.personalTab = './assets/img/user/ic_personal_disable.png';
    this.adressTab = './assets/img/user/ic_adress_disable.png';
  }

  verifyType() {
    if (this.user !== undefined) {
      if (this.user.person !== undefined ) {
        this.user.type = 'PFIS';
        this.show_pjur = false;
      } else {
        this.user.type = 'PJUR';
        this.show_pjur = true;
      }
    }
  }

  loadUser() {
    this.loaderService.show();
    this.userService.load(this.urlId).subscribe(
      success => {
        this.user = success[0];
        this.verifyType();
        setTimeout(() => {
          this.loaderService.hide();
        }, 400);
      },
      error => {
        this.loaderService.hide();
        console.log(error);
      }
    );
  }

  editUser() {
    localStorage.setItem('userId', this.user.id);
    if (this.url === '/user-details') {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/agent']);
    }
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
      success => {
        this.toastService.toastSuccess();
        // this.router.navigate(['/user-details']);
      },
      error => console.log(error)
    );
  }

  walk ( tab: number) {
    switch (tab) {
      case 0:
      this.accountTab = './assets/img/user/ic_account_enable.png';
      this.personalTab = './assets/img/user/ic_personal_disable.png';
      this.adressTab = './assets/img/user/ic_adress_disable.png';
      break;
      case 1:
      this.accountTab = './assets/img/user/ic_account_disable.png';
      this.personalTab = './assets/img/user/ic_personal_enable.png';
      this.adressTab = './assets/img/user/ic_adress_disable.png';
      break;
      case 2:
      this.accountTab = './assets/img/user/ic_account_disable.png';
      this.personalTab = './assets/img/user/ic_personal_disable.png';
      this.adressTab = './assets/img/user/ic_adress_enable.png';
      break;
    }
  }

  back() {
    console.log(this.url);
    if (this.url === '/user-details') {
      this.router.navigate(['/user-list']);
    } else {
      this.router.navigate(['/agent-information']);
    }
  }
}
