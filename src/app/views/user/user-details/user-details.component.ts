import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private user: User;
  show_pjur: boolean;

  constructor( private userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.show_pjur = false;
    this.user = this.userService.getUser();
    console.log(this.user);
    this.verifyType();
  }

  verifyType() {
    if (this.user !== undefined) {
      switch (this.user.type) {
        case 'PFIS':
        {
          this.show_pjur = false;
          this.user.pjur = null;
          console.log('Tipo:', this.user.type);
          console.log('Org:', this.user.pjur);
          console.log('Person:', this.user.pfis);
          break;
        }

        case 'PJUR':
        {
          this.show_pjur = true;
          this.user.pfis = null;
          console.log('Tipo:', this.user.type);
          console.log('Org:', this.user.pjur);
          console.log('Person:', this.user.pfis);
          break;
        }
      }
    }
  }

}
