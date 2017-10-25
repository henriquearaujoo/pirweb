import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { Types } from '../../models/types';

import { CreateUserService } from '../../services/user-create/create-user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private user: User;
  private types: Types[] = [new Types(1, 'Pessoa Fi­sica'), new Types(1, 'Pessoa Jurídica')];
  private states = new Array();
  private cities = new Array();
  private profile = ['Administrador', 'Agente', 'Terceiro'];
  private hasdata: boolean;

  constructor(private userService: CreateUserService) {
      this.user = new User();
  }

  saveData() {
    this.userService.createUser(this.user).subscribe(
      success => {

      },
      error => console.log(error)
    );
    console.log(this.user);
  }

  ngOnInit() {
    this.loadStates();
  }

  public loadStates(id?: number) {
    this.userService.getStates(id).subscribe(
      success => {
        if (success == null) {
          this.hasdata = false;
        }
        this.states = success;
        console.log(this.states);
        this.hasdata = true;
      },
      error => console.log(error)
    );
  }

  public loadCities(state_id: number) {
    this.userService.getCities(state_id).subscribe(
      success => {
        if (success == null) {
          this.hasdata = false;
        }
        this.cities = success;
        this.hasdata = true;
      },
      error => console.log(error)
    );
  }
}
