
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
  private city_id: number;
  private state_id: string;
  private error_list = new Array();
  private error_item = new Array<string>();

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
    this.user.address.city = Number(this.user.address.city);
    this.userService.saveEditUser(this.user).subscribe(
      success => {
        this.userService.show_msg = true;
        this.router.navigate(['/user-list']);
      },
      error => {
        this.error_list = error;
        this.verifyError();
      }
    );
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

  verifyValidSubmitted(form, field) {
    return form.submitted && !field.valid;
  }

  verifyError() {
    if (this.error_list.length < 7) {
      this.error_list.forEach( er => {
        switch (er) {
          case 'user.type.pfis.cpf.valid': {
            this.error_item = er.toUpperCase().split('.');
            console.log(this.error_item);
            this.toastService.toastErrorExists(this.error_item[this.error_item.length - 2]);
            break;
          }
          case 'user.type.pjur.cnpj.valid': {
            this.error_item = er.toUpperCase().split('.');
            console.log(this.error_item);
            this.toastService.toastErrorExists(this.error_item[this.error_item.length - 2]);
            break;
          }
          case 'user.type.pfis.rg.short': {
            this.error_item = er.toUpperCase().split('.');
            console.log(this.error_item);
            this.toastService.toastErrorValid(this.error_item[this.error_item.length - 2]);
            break;
          }
          case 'user.password.short': {
            this.error_item = er.toUpperCase().split('.');
            console.log(this.error_item);
            this.toastService.toastErrorPassword();
            break;
          }
          default: {
            this.toastService.toastError();
            console.log(this.error_list);
          }
        }
      });
    } else {
      const er  = this.error_list.toString();
      switch (er) {
        case 'user.login.exists': {
          this.error_item = er.toUpperCase().split('.');
          console.log(this.error_item);
          this.toastService.toastErrorExists(this.error_item[this.error_item.length - 2]);
          break;
        }
        case 'user.type.pfis.cpf.exists': {
          this.error_item = er.toUpperCase().split('.');
          console.log(this.error_item);
          this.toastService.toastErrorExists(this.error_item[this.error_item.length - 2]);
          break;
        }
        case 'user.type.pjur.cnpj.exists': {
          this.error_item = er.toUpperCase().split('.');
          console.log(this.error_item);
          this.toastService.toastErrorExists(this.error_item[this.error_item.length - 2]);
          break;
        }
        case 'user.email.exists': {
          this.error_item = er.toUpperCase().split('.');
          console.log(this.error_item);
          this.toastService.toastErrorExists(this.error_item[this.error_item.length - 2]);
          break;
        }
        case 'user.type.pfis.cpf.invalid': {
          this.error_item = er.toUpperCase().split('.');
          console.log(this.error_item);
          this.toastService.toastErrorValid(this.error_item[this.error_item.length - 2]);
          break;
        }
        case 'user.type.pjur.cnpj.invalid': {
          this.error_item = er.toUpperCase().split('.');
          console.log(this.error_item);
          this.toastService.toastErrorValid(this.error_item[this.error_item.length - 2]);
          break;
        }
        default: {
          this.toastService.toastError();
          console.log(this.error_list);
        }
      }
    }
   }

  applyCssError(form, field) {
    return {
      'has-error': this.verifyValidSubmitted(form, field),
      'has-feedback': this.verifyValidSubmitted(form, field)
    };
  }

}
