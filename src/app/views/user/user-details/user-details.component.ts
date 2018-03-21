import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { City } from './../../../models/city';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
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
    this.permissions.canActivate('/user-details');
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
        // this.profileService.load(this.user.profile).subscribe(
        //   s => {
        //     this.profile = s[0];
        //     this.user.profile = this.profile.title;
        //     if (this.user.address !== undefined) {
        //       this.city_id = this.user.address.city;
        //     } else {
        //       this.user.address = new Address();
        //     }
        //     this.verifyType();
        //     this.loadCityState();
        //     setTimeout(() => {
        //       this.loaderService.hide();
        //     }, 400);
        //   }
        // );
      },
      error => {
        this.loaderService.hide();
        console.log(error);
      }
    );
  }

  // loadCityState() {
  //   if (this.user.address.city !== undefined) {
  //     this.userService.getCity(this.user.address.city).subscribe(
  //       success_city => {
  //         this.user.address.city = success_city.name;
  //         this.userService.getStates(success_city.state_id).subscribe(
  //           success_state => {
  //             this.user.address.state = success_state.name;
  //           },
  //           error => console.log(error)
  //         );
  //       },
  //       error => console.log(error)
  //     );
  //   }
  // }

  editUser() {
    localStorage.setItem('userId', this.user.id);
    this.router.navigate(['/user']);
  }

  // changeStatus(user: User) {
  //   this.user
  // }

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
}
