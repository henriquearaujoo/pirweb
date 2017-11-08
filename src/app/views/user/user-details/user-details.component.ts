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

  constructor(
    private userService: UserService,
    private router: Router ) {
    this.user = new User();
  }

  ngOnInit() {
    this.show_pjur = false;
    this.user = this.userService.getUser();
    console.log(this.user);
    this.verifyType();
    this.loadCityState();
  }

  verifyType() {
    if (this.user !== undefined) {
      switch (this.user.type) {
        case 'PFIS':
        {
          this.show_pjur = false;
          this.user.pjur = null;
          break;
        }

        case 'PJUR':
        {
          this.show_pjur = true;
          this.user.pfis = null;
          break;
        }
      }
    }
  }

  loadCityState() {
    this.userService.getCity(this.user.address.city).subscribe(
      success_city => {
        this.user.address.city = success_city.name;
        console.log('Cidade:', success_city);
        this.userService.getStates(success_city.state_id).subscribe(
          success_state => {
            this.user.address.state = success_state.name;
            console.log('Estado:', success_state);
          },
          error => console.log('Error Estado:', error)
        );
      },
      error => console.log('Erro Cidade:', error)
    );

  }

  editUser() {
   // UserDetailsComponent.eventEdit.emit(true);
    this.router.navigate(['user-edit']);
  }
}
