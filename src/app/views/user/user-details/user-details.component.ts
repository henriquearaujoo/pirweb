import { City } from './../../../models/city';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private user: User;
  show_pjur: boolean;
  private cities: City[];
  private city_id: string;
  private state_id: string;

  constructor(
    private userService: UserService,
    private router: Router ) {
    this.user = new User();
  }

  ngOnInit() {
    this.show_pjur = false;
    this.user = this.userService.getUser();
    this.city_id = this.user.address.city;
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
}
