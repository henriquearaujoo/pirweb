import { Community } from './../../models/community';
import { ToastService } from './../../services/toast-notification/toast.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { Person } from './../../models/person';
import { Org } from './../../models/org';
import { ProfileService } from './../../services/profile/profile.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { Types } from '../../models/types';

import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { IFormCanDeActivate } from '../../guards/iform-candeactivate';
import { ModalService } from '../../components/modal/modal.service';
import { sha256, sha224 } from 'js-sha256';
import { Permissions, RuleState } from '../../helpers/permissions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private isOk = false;
  private user: User;
  private types: Types[] = [new Types('PFIS', 'Pessoa Fi­sica'), new Types('PJUR', 'Pessoa Jurídica')];
  private communities: Community[] = new Array();
  private states = new Array();
  private cities = new Array();
  private profiles: Profile[] = new Array();
  private profile: string;
  private org: Org;
  private person: Person;
  private first_name: string;
  private last_name: string;
  private hasdata: boolean;
  private show_pjur: boolean;
  private success: boolean;
  private error_list = new Array();
  private error_item = new Array<string>();
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private maskCEP = [ /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  private maskCPF = [ /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  private maskRg = [ /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  private accountTab: string;
  private personalTab: string;
  private adressTab: string;
  private currentTab: number;
  private previousTab: string;
  private nextTab: string;
  private next: string;
  private enable_save: boolean;
  private enable_previous: boolean;
  private cont: number;
  private modalSave: string;

  private modalOpened: boolean;
  private openSaveButtonTab1: HTMLButtonElement;
  private openSaveButtonTab2: HTMLButtonElement;
  private openSaveButtonTab3: HTMLButtonElement;
  private type: any;
  // private openModalCancel: HTMLButtonElement;
  private show_community: boolean;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private isFormValid: boolean;
  private tab: string;
  private _isSave: boolean;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private modalService: ModalService,
    private permissions: Permissions) {
      this.user = new User();
      this.org = new Org();
      this.person = new Person();
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
  }

  ngOnInit() {
    this.permissions.canActivate('/user');
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
        // this.loaderService.hide();
      }
    );
    this.loadStates();
    this.loadProfiles();
    this.show_pjur = false;
    this.show_community = false;
    this.success = false;
    this.error_list = [];
    this.modalOpened = false;

    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';
    this.accountTab = '../../../assets/img/user/ic_account_enable.png';
    this.personalTab = '../../../assets/img/user/ic_personal_disable.png';
    this.adressTab = '../../../assets/img/user/ic_adress_disable.png';

    this.enable_save = false;
    this.cont = 0;
    this.modalSave = '#modal-default';

    this.openSaveButtonTab1 = (<HTMLButtonElement>document.getElementById('btn_tab1'));
    this.openSaveButtonTab1.style.display = 'none';

    this.openSaveButtonTab2 = (<HTMLButtonElement>document.getElementById('btn_tab2'));
    this.openSaveButtonTab2.style.display = 'none';

    this.openSaveButtonTab3 = (<HTMLButtonElement>document.getElementById('btn_tab3'));
    this.openSaveButtonTab3.style.display = 'none';

    // this.openModalCancel = (<HTMLButtonElement>document.getElementById('openModalCancel'));
    // this.openModalCancel.style.display = 'none';

    (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';

  }

  saveData(isValid: boolean) {
    console.log('isValid', isValid);

    if (isValid && this._isSave) {
      this.modalOpened = false;
      this.verifyType();
      // console.log(this.user.profile);
      // this.user.name = this.first_name + ' ' + this.last_name;
      // this.user.address.city = Number(this.user.address.city);
      this.success = true;
      if (this.type === 'PJUR') {
        console.log('SAVE ORG', this.org);
        this.userService.createEntity(this.org).subscribe(
          s_org => {
            this.openModalSuccess();
            // this.router.navigate(['/user-list']);
          },
          error => {
            this.toastService.toastError();
            this.error_list = error;
            this.verifyError();
          }
        );
      } else {
        if (this.type === 'PFIS') {
          console.log('SAVE PERSON', this.person);
          this.userService.createPerson(this.person).subscribe(
            s_person => {
              this.openModalSuccess();
              // this.router.navigate(['/user-list']);
            },
            error => {
              this.error_list = error;
              this.toastService.toastError();
              this.verifyError();
            }
          );
        }
      }
    }
  }

  openModalSuccess() {
    if (!this.modalOpened) {
      this.modalOpened = true;
      // this.openModalButton.click();
      this.modalService.modalSuccess('/user-list');
      return false;
    }
  }

  openModal() {
    this.modalService.modalCancel('/user-list');
    // this.openModalCancel.click();
    // return false;
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

  verifyType() {
    this.user.name = this.first_name + ' ' + this.last_name;
    this.user.address.city = Number(this.user.address.city);

    switch (this.user.type) {
      case 'PFIS':
      {
        // this.user.pfis = this.person;
        this.person.cpf = this.person.cpf.split('.').join('');
        this.person.cpf = this.person.cpf.split('-').join('');
        this.user.address.postalcode = this.user.address.postalcode.replace('-', '');
        this.person.address = this.user.address;
        this.person.email = this.user.email;
        this.person.login = this.user.login;
        this.person.name = this.user.name;
        this.person.password = sha256(this.user.password);
        this.person.profile = this.user.profile;
        this.person.status = this.user.status;
        this.person.type = this.user.type;
        this.type = 'PFIS';
        // this.org = null;
        break;
      }

      case 'PJUR':
      {
        this.user.address.postalcode = this.user.address.postalcode.replace('-', '');
        this.org.address = this.user.address;
        this.org.email = this.user.email;
        this.org.login = this.user.login;
        this.org.name = this.user.name;
        this.org.password = sha256(this.user.password);
        this.org.profile = this.user.profile;
        this.org.status = this.user.status;
        this.org.type = this.user.type;
        this.type = 'PJUR';
        // this.user.pjur = this.org;
        // this.person = null;
        break;
      }
    }
  }

  verifyError() {
    if (this.error_list.length < 7) {
      this.error_list.forEach( er => {
        switch (er) {
          case 'user.type.pfis.cpf.valid': {
            console.log(er);
            this.toastService.toastErrorValid('CPF');
            break;
          }
          case 'user.type.pfis.cpf.invalid': {
            console.log(er);
            this.toastService.toastErrorValid('CPF');
            break;
          }
          case 'user.type.pjur.cnpj.valid': {
            console.log(er);
            this.toastService.toastErrorValid('CNPJ');
            break;
          }
          case 'user.type.pjur.cnpj.invalid': {
            console.log(er);
            this.toastService.toastErrorValid('CNPJ');
            break;
          }
          case 'user.type.pfis.rg.short': {
            console.log(er);
            this.toastService.toastErrorValid('RG');
            break;
          }
          default: {
            this.toastService.toastError();
            console.log(this.error_list);
            console.log(er);
          }
        }
      });
    } else {
      const er  = this.error_list.toString();
      switch (er) {
        case 'user.login.exists': {
          console.log(er);
          this.toastService.toastErrorExists('LOGIN');
          break;
        }
        case 'user.type.pfis.cpf.exists': {
          console.log(er);
          this.toastService.toastErrorExists('CPF');
          break;
        }
        case 'user.type.pjur.cnpj.exists': {
          console.log(er);
          this.toastService.toastErrorExists('CNPJ');
          break;
        }
        case 'user.email.exists': {
          console.log(er);
          this.toastService.toastErrorExists('EMAIL');
          break;
        }
        case 'user.type.pfis.cpf.invalid': {
          console.log(er);
          this.toastService.toastErrorValid('CPF');
          break;
        }
        case 'user.type.pjur.cnpj.invalid': {
          console.log(er);
          this.toastService.toastErrorValid('CNPJ');
          break;
        }
        default: {
          this.toastService.toastError();
          console.log(er);
          console.log(this.error_list);
        }
      }
    }
   }

  save(tab: string, isValid: boolean) {
    this.isFormValid = isValid;
    this.tab = tab;
    this._isSave = false;
    console.log('tab:', tab);
    console.log('isValid:', isValid);
    console.log('isSave:', this._isSave);
  }

  isSave() {
    this._isSave = true;
  }

   isActive(tab: boolean, t?: number) {
    //  this.tab = t ;
    console.log('currentTab', this.currentTab);
    if (t === 1) {
      this.openSaveButtonTab1.click();
      console.log('openSaveButtonTab1');
    } else {
      if ( t === 2) {
        this.openSaveButtonTab2.click();
        console.log('openSaveButtonTab2');
      } else {
        if (t === 3) {
          this.isFormValid = true;
          // this.openSaveButtonTab3.click();
          // console.log('openSaveButtonTab3');
        }
      }
    }

    if ( this.isFormValid) {
      this.isFormValid = false;
      if (tab) {
        if (this.currentTab === -1) {
              this.currentTab = 0;
        } else if (this.currentTab < 2) {
              this.currentTab++;
              this.cont++;
              console.log('TAB:', this.cont);
          }
      }else {
        if (this.currentTab > 0) {
              this.currentTab--;
              this.cont--;
              console.log('TAB:', this.cont);
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
      } else {
        if (t === 1) {
          this.nextTab = '#tab_1';
          console.log('nextTab:', this.nextTab);
        } else {
          if (t === 2) {
            this.nextTab = '#tab_2';
            console.log('nextTab:', this.nextTab);
          }
        }
      }

  }

  verifyValidSubmitted(form, field) {
    this.isOk = form.submitted && !field.valid;
    return form.submitted && !field.valid;
  }

  applyCssError(form, field) {
    return {
      'has-error': this.verifyValidSubmitted(form, field),
      'has-feedback': this.verifyValidSubmitted(form, field)
    };
  }

  backToList() {
    this.router.navigate(['user-list']);
  }
}
