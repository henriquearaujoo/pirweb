
import { ToastService } from './../../../services/toast-notification/toast.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Types } from '../../../models/types';
import { Profile } from '../../../models/profile';
import { Org } from '../../../models/org';
import { Person } from '../../../models/person';
import { UserService } from '../../../services/user/user.service';
import { ProfileService } from '../../../services/profile/profile.service';
import { Router } from '@angular/router';

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
  private city_id: string;
  private state_id: string;
  private success: boolean;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private toastService: ToastService) {
      this.user = new User();
      this.org = new Org();
      this.person = new Person();
      this.success = true;
    }

  ngOnInit() {
    this.show_pjur = false;
    this.user = this.userService.getUser();
    this.city_id = this.user.address.city;
    this.selectType();
    this.getState();
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

  editData() {
    this.verifyType();
    console.log(this.user);
    this.userService.saveEditUser(this.user).subscribe(
      success => {
        console.log('success1:', this.success);
        this.toastService.toastSuccess();
        this.success = true;
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
            this.success = false;
         } else {
         if ( (error === 'user.type.pfis.cpf.invalid') ||
            (error === 'user.type.pjur.cnpj.invalid') ) {
              er = res.toUpperCase().split('.');
              this.toastService.toastErrorValid(er[er.length - 2]);
              this.success = false;
          } else {
              console.log(error);
          }
        }
        this.success = false;
      }
    );
    console.log('success2:', this.success);
    if (this.success) {
      this.router.navigate(['/user-list']);
    }
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
          });
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

  public loadCities(state_id?: string) {
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

  getState() {
    this.userService.getCity(this.city_id).subscribe(
      success => {
        this.state_id = success.state_id;
        this.loadCities(this.state_id);
        this.loadStates();
        this.user.address.state = this.state_id;

      },
      error => console.log(error)
    );

  }

  selectType() {
    switch (this.user.type) {
      case 'PFIS':
      {
        this.show_pjur = false;
        if (this.user.pfis !== undefined) {
          this.person = this.user.pfis;
        } else {
          this.person = new Person();
        }
        break;
      }

      case 'PJUR':
      {
        this.show_pjur = true;
        if (this.user.pjur !== undefined) {
          this.org = this.user.pjur;
        } else {
          this.org = new Org();
        }
        break;
      }
    }
  }

  verifyType() {
    if (this.user !== undefined) {
      switch (this.user.type) {
        case 'PFIS':
        {
          this.show_pjur = false;
          if (this.user.pjur !== undefined) {
            this.user.pfis = this.person;
            this.user.pjur = null;
            delete this.user.pjur;
          } else {
            this.user.pfis = this.person;
          }
          break;
        }

        case 'PJUR':
        {
          this.show_pjur = true;
          if (this.user.pfis !== undefined) {
            this.user.pjur = this.org;
            this.user.pfis = null;
            delete this.user.pfis;
          } else {
            this.user.pjur = this.org;
          }
          break;
        }
      }
    }
  }
}
