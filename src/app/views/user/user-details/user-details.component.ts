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
      switch (this.user.type) {
        case 'PFIS':
        {
          this.show_pjur = false;
          break;
        }

        case 'PJUR':
        {
          this.show_pjur = true;
          break;
        }
      }
    }
  }

  loadUser() {
    this.loaderService.show();
    this.userService.load(this.urlId).subscribe(
      success => {
        this.user = success[0];
        // if (this.user.address !== undefined) {
        //   this.city_id = this.user.address.city;
        // } else {
        //   this.user.address = new Address();
        // }
        this.verifyType();
        // this.loadCityState();
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

  // editUser() {
  //   this.user.address.city = this.city_id;
  // }

  // changeStatus(user: User) {
  //   this.user.address.city = this.city_id;
  // }

  disableAbleUser() {
    if (this.user.status === true) {
      this.user.status = false;
    } else {
      this.user.status = true;
    }

    this.userService.saveEditUser(this.user).subscribe(
      success => {
        this.toastService.toastSuccess();
        this.router.navigate(['/user-list']);
      },
      error => console.log(error)
    );

    // this.profileService.getProfiles().subscribe(
    //   success_profiles => {
    //     this.profiles = success_profiles;
    //     this.profiles.forEach( profile => {
    //       if (this.user.profile === profile.title) {
    //         this.user.profile = profile.id;
    //       }
    //     });
    //   }
    // );
    // console.log(this.user);
  }
}
