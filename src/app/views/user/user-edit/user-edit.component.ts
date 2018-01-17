import { ToastService } from './../../../services/toast-notification/toast.service';
import { Component, OnInit} from '@angular/core';
import { User } from '../../../models/user';
import { Types } from '../../../models/types';
import { Profile } from '../../../models/profile';
import { Org } from '../../../models/org';
import { Person } from '../../../models/person';
import { UserService } from '../../../services/user/user.service';
import { ProfileService } from '../../../services/profile/profile.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Community } from '../../../models/community';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  private user: User;
  private types: Types[] = [new Types('PFIS', 'Pessoa Fi­sica'), new Types('PJUR', 'Pessoa Jurídica')];
  private communities: Community[] = new Array();
  private profile: string;
  private states = new Array();
  private cities = new Array();
  private profiles: Profile[] = new Array();
  private org: Org;
  private person: Person;
  private first_name: string;
  private last_name: string;
  private hasdata: boolean;
  show_pjur: boolean;
  private city_id: number;
  private state_id: string;
  private error_list = new Array();
  private error_item = new Array<string>();
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};

  private accountTab: string;
  private personalTab: string;
  private adressTab: string;
  private currentTab: number;
  private previousTab: string;
  private nextTab: string;
  private next: string;
  private enable_save: boolean;
  private modalSave: string;

  private modalOpened: boolean;
  private openModalButton: HTMLButtonElement;
  private btn_cancel: boolean;
  private type: any;
  private urlId: string;
  private show_community: boolean;

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

    this.btn_cancel = false;
    this.show_pjur = false;
    this.show_community = false;
    this.urlId = localStorage.getItem('userId');
    console.log('userId', this.urlId);
    if (this.urlId !== undefined || this.urlId !== '') {
      this.loadUser();
    }
    // this.user = this.userService.getUser();
    this.modalSave = '#modal-default';
    this.modalOpened = false;

    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';
    this.accountTab = '../../../assets/img/user/ic_account_enable.png';
    this.personalTab = '../../../assets/img/user/ic_personal_disable.png';
    this.adressTab = '../../../assets/img/user/ic_adress_disable.png';

    this.enable_save = false;

    this.openModalButton = (<HTMLButtonElement>document.getElementById('openModalButton'));
    this.openModalButton.style.display = 'none';
    (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';
  }

  editData() {
    if (this.btn_cancel) {
      this.btn_cancel = false;
      return false;
    }
    this.modalOpened = false;
    this.verifyType();
    // console.log('EDITAR',  this.user);
    // this.user.address.city = Number(this.user.address.city);
    // this.user.name = this.first_name + ' ' + this.last_name;

    if (this.type === 'PJUR') {
      console.log('SAVE ORG', this.org);
      this.userService.saveEditEntity(this.org).subscribe(
        s_org => {
          this.openModal();
          // this.router.navigate(['/user-list']);
        },
        error => {
          this.error_list = error;
          this.verifyError();
        }
      );
    } else {
      if (this.type === 'PFIS') {
        console.log('SAVE PERSON', this.person);
        this.userService.saveEditPerson(this.person).subscribe(
          s_person => {
            this.openModal();
            // this.router.navigate(['/user-list']);
          },
          error => {
            this.error_list = error;
            this.verifyError();
          }
        );
      }
    }
  }

  openModal() {
    if (!this.modalOpened) {
      this.modalOpened = true;
      this.openModalButton.click();
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

  loadUser() {
    this.userService.load(this.urlId).subscribe(
      success => {
        this.user = success[0];
        if (this.user !== undefined) {
          this.person = this.user.pfis;
          this.org = this.user.pjur;
          this.first_name = this.user.name.split(' ')[0];
          this.last_name = this.user.name.split(' ')[1];

          this.city_id = this.user.address.city;
          this.selectType();
          this.getState();
          this.loadProfiles();
        } else {
            this.user = new User();
            this.org = new Org();
            this.person = new Person();
        }
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
      this.user.address.city = Number(this.user.address.city);
      this.user.name = this.first_name + ' ' + this.last_name;

      switch (this.user.type) {
        case 'PFIS':
        {
          this.show_pjur = false;

          this.person.id = this.user.id;
          this.person.address = this.user.address;
          this.person.email = this.user.email;
          this.person.login = this.user.login;
          this.person.name = this.user.name;
          this.person.password = this.user.password;
          this.person.profile = this.user.profile;
          this.person.status = this.user.status;
          this.person.type = this.user.type;
          this.type = 'PFIS';
          break;
        }

        case 'PJUR':
        {
          this.show_pjur = true;

          this.org.id = this.user.id;
          this.org.address = this.user.address;
          this.org.email = this.user.email;
          this.org.login = this.user.login;
          this.org.name = this.user.name;
          this.org.password = this.user.password;
          this.org.profile = this.user.profile;
          this.org.status = this.user.status;
          this.org.type = this.user.type;
          this.type = 'PJUR';
          break;
        }
      }
    }
  }

  selectProfile() {
    this.profiles.forEach( elem => {
      if (this.user !== undefined) {
        if (elem.id === this.user.profile) {
          this.profile = elem.title;
        }
      }
    });
    console.log('Select Profile:', this.profile);
    switch (this.profile.toUpperCase()) {
      case 'AGENTE':
      {
        this.show_community = true;
        break;
      }
      default:
      {
        this.show_community = false;
        break;
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

  isActive(tab: boolean) {
    if (tab) {
      if (this.currentTab === -1) {
            this.currentTab = 0;
      } else if (this.currentTab < 2) {
            this.currentTab++;
        }
    }else {
      if (this.currentTab > 0) {
            this.currentTab--;
          }
    }
      this.previousTab = '#tab_' + (this.currentTab + 1);
      this.nextTab = '#tab_' + (this.currentTab + 1);

      if (this.nextTab === '#tab_3') {
        this.enable_save = true;
      } else {
        this.enable_save = false;
      }

      if (this.currentTab === 0) {
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';
          this.accountTab = '../../../assets/img/user/ic_account_enable.png';
          this.personalTab = '../../../assets/img/user/ic_personal_disable.png';
          this.adressTab = '../../../assets/img/user/ic_adress_disable.png';

      }else if (this.currentTab === 1) {
          this.accountTab = '../../../assets/img/user/ic_account_disable.png';
          this.personalTab = '../../../assets/img/user/ic_personal_enable.png';
          this.adressTab = '../../../assets/img/user/ic_adress_disable.png';
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = '';
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = '';

      }else {
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
          this.accountTab = '../../../assets/img/user/ic_account_disable.png';
          this.personalTab = '../../../assets/img/user/ic_personal_disable.png';
          this.adressTab = '../../../assets/img/user/ic_adress_enable.png';
          this.next = 'Salvar';
        }
  }

  backToList() {
    this.router.navigate(['user-list']);
  }

  cancel() {
    console.log('cancel', this.btn_cancel);
    this.btn_cancel = true;
  }

}
