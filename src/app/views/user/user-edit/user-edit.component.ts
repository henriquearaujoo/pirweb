import { ToastService } from './../../../services/toast-notification/toast.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Types } from '../../../models/types';
import { Profile } from '../../../models/profile';
import { Org } from '../../../models/org';
import { Person } from '../../../models/person';
import { UserService } from '../../../services/user/user.service';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  private user: User;
  private types: Types[] = [new Types('PFIS', 'Pessoa Fi­sica'), new Types('PJUR', 'Pessoa Jurídica')];
  private states = new Array();
  private cities = new Array();
  private profiles: Profile[] = new Array();
  private org: Org;
  private person: Person;
  private hasdata: boolean;
  show_pjur: boolean;
  edit: boolean;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private toastService: ToastService) {
      this.user = new User();
      this.org = new Org();
      this.person = new Person();
    }

  ngOnInit() {
    this.show_pjur = false;
    this.user = this.userService.getUser();
    this.selectType();
    this.loadStates();
    this.loadProfiles();

    if (this.user !== undefined) {
        this.person = this.user.pfis;
        this.org = this.user.pjur;
    } else {
        this.user = new User();
        this.org = new Org();
        this.person = new Person();
    }

  }

  ngOnChange() {
  }

  editData() {
    this.verifyType();
    console.log(this.user);
    this.userService.saveEditUser(this.user).subscribe(
      success => {
        this.toastService.toastSuccess();
      },
      error => console.log('Erro editar', error)
    );
    console.log(this.user);
  }

  public loadProfiles() {
    this.profileService.getProfiles().subscribe(
      success => {
          this.profiles = success;
          console.log(this.profiles);
          this.hasdata = true;
          this.profiles.forEach( profile => {
            if (this.user !== undefined) {
              if (profile.title === this.user.profile) {
                this.user.profile = profile.id;
              }
            }
          }

          );
      },
      error => console.log('Error Profile:', error)
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
        this.states.forEach( state => {
          if (state.name === this.user.address.state) {
            this.user.address.state = state.id;
          }
        });
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
        this.cities.forEach( city => {
          if (city.name === this.user.address.city) {
            this.user.address.city = city.id;
          }
        });
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
    if (this.user !== undefined) {
      switch (this.user.type) {
        case 'PFIS':
        {
          this.user.pfis = this.person;
          this.org = null;
          console.log('Tipo:', this.user.type);
          console.log('Org:', this.user.pjur);
          console.log('Person:', this.user.pfis);
          break;
        }

        case 'PJUR':
        {
          this.user.pjur = this.org;
          this.person = null;
          console.log('Tipo:', this.user.type);
          console.log('Org:', this.user.pjur);
          console.log('Person:', this.user.pfis);
          break;
        }
      }
    }
  }
}
