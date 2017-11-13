import { ToastService } from './../../services/toast-notification/toast.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { Person } from './../../models/person';
import { Org } from './../../models/org';
import { ProfileService } from './../../services/profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { Types } from '../../models/types';

import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private user: User;
  private types: Types[] = [new Types('PFIS', 'Pessoa Fi­sica'), new Types('PJUR', 'Pessoa Jurídica')];
  private states = new Array();
  private cities = new Array();
  private profiles: Profile[] = new Array();
  private org: Org;
  private person: Person;
  private hasdata: boolean;
  show_pjur: boolean;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private toastService: ToastService) {
      this.user = new User();
      this.org = new Org();
      this.person = new Person();
  }

  ngOnInit() {
    this.loadStates();
    this.loadProfiles();
    this.show_pjur = false;
  }

  ngOnChange() {
  }

  saveData() {
    this.verifyType();
    console.log(this.user.profile);
    this.userService.createUser(this.user).subscribe(
      success => {
        this.toastService.toastSuccess();
        this.router.navigate(['/user-list']);
      },
      error => {
        const res: string = error;
        let er = new Array<string>();
        if ( (error === 'user.login.exists') ||
          (error === 'user.type.pfis.cpf.exists') ||
          (error === 'user.type.pjur.cnpj.exists') ||
          (error === 'user.email.exists')) {
            er = res.toUpperCase().split('.');
            this.toastService.toastErrorExists(er[er.length - 2]);
         } else {
         if ( (error === 'user.type.pfis.cpf.valid') ||
            (error === 'user.type.pjur.cnpj.valid') ) {
              er = res.toUpperCase().split('.');
              this.toastService.toastErrorValid(er[er.length - 2]);
          } else {
              console.log(error);
          }
        }
      }
    );
  }

  public loadProfiles() {
    this.profileService.getProfiles().subscribe(
      success => {
          this.profiles = success;
          console.log(this.profiles);
          this.hasdata = true;
      },
      error => console.log(error)
    );
  }

  public loadStates(id?: string) {
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

  public loadCities(state_id: string) {
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

  selectType() {
    switch (this.user.type) {
      case 'PFIS':
      {
        this.show_pjur = false;
        this.person = new Person();
        break;
      }

      case 'PJUR':
      {
        this.show_pjur = true;
        this.org = new Org();
        break;
      }
    }
  }

  verifyType() {
    switch (this.user.type) {
      case 'PFIS':
      {
        this.user.pfis = this.person;
        this.org = null;
        break;
      }

      case 'PJUR':
      {
        this.user.pjur = this.org;
        this.person = null;
        break;
      }
    }
  }

}
