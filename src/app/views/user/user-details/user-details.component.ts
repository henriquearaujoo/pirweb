import { City } from './../../../models/city';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { ProfileService } from '../../../services/profile/profile.service';
import { Profile } from '../../../models/profile';
import { ToastService } from '../../../services/toast-notification/toast.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private user: User;
  show_pjur: boolean;
  private profiles: Profile[] = new Array();
  private cities: City[];
  private city_id: string;
  private state_id: string;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router ) {
    this.user = new User();
  }

  ngOnInit() {
    this.show_pjur = false;
    this.user = this.userService.getUser();
    this.city_id = this.user.address.city;
    console.log(this.city_id);
    this.verifyType();
    this.loadCityState();
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

  loadCityState() {
    this.userService.getCity(this.user.address.city).subscribe(
      success_city => {
        this.user.address.city = success_city.name;
        this.userService.getStates(success_city.state_id).subscribe(
          success_state => {
            this.user.address.state = success_state.name;
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );

  }

  editUser() {
    this.user.address.city = this.city_id;
  }

  changeStatus(user: User) {
    console.log(this.user);
    this.user.address.city = this.city_id;
    console.log(this.user.address.city);

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
            this.toastService.toastSuccess();
            this.router.navigate(['/user-list']);
          },
          error => console.log(error)
        );
      }
    );
    console.log(this.user);
  }
}
