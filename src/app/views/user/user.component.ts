import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { LoaderService } from './../../services/loader/loader.service';
import { SweetAlertService } from './../../services/sweetalert/sweet-alert.service';
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
import { Router, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot, RouterState } from '@angular/router';
import * as $ from 'jquery';
import { IFormCanDeActivate } from '../../guards/iform-candeactivate';
import { ModalService } from '../../components/modal/modal.service';
import { sha256, sha224 } from 'js-sha256';
import { Permissions, RuleState } from '../../helpers/permissions';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  private isOk = false;
  private user: User;
  private types: Types[] = [new Types('PFIS', 'Pessoa Fi­sica'), new Types('PJUR', 'Pessoa Jurídica')];
  private communities: Community[] = new Array();
  private states = new Array();
  private cities = new Array();
  private profiles: Profile[] = new Array();
  private profile: Profile = new Profile();
  private entity: Org;
  private person: Person;
  private first_name: string;
  private last_name: string;
  private hasdata: boolean;
  private show_pjur: boolean;
  private success: boolean;
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
  private enable_previous: boolean;
  private cont: number;
  private modalSave: string;
  private isNewData: boolean;

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
  private urlId: string;
  private city_id: number;
  private currentId: string;
  private url: string;
  private isAgent: boolean;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private modalService: ModalService,
    private permissions: Permissions,
    private sweetAlertService: SweetAlertService,
    private loaderService: LoaderService,
    private _location: Location) {
      this.user = new User();
      this.entity = new Org();
      this.person = new Person();
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
      this.hasdata = false;
      this.isAgent = false;
  }

  ngOnInit() {
    const state: RouterState = this.router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    this.url = snapshot.url;
    this.permissions.canActivate(['/user', '/agent']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.profile = rules.profile;
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
        if (this.profile.type === 'AGENT') {
          this.isAgent = true;
          localStorage.setItem('userId', localStorage.getItem('currentIdPir'));
        }
      }
    );
    /*check if is a new or update*/
    this.isNewData = true;
    this.urlId = localStorage.getItem('userId');
    if (this.urlId !== undefined && this.urlId !== '' && this.urlId !== null) {
      this.isNewData = false;
      this.loadUser();
    }
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
    this.accountTab = './assets/img/user/ic_account_enable.png';
    this.personalTab = './assets/img/user/ic_personal_disable.png';
    this.adressTab = './assets/img/user/ic_adress_disable.png';

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
    if (isValid && this._isSave) {
      this.modalOpened = false;
      this.verifyType();
      console.log(this.user);
      this.user.profile_id = this.user.profile.id;
      this.user.address.city_id = this.user.address.city.id;
      if (this.isNewData || this.user.id === undefined) {
        if (this.canCreate) {
          this.userService.createUser(this.user).subscribe(
            success => {
              if (this.url === '/user') {
                this.sweetAlertService.alertSuccess('user-list');
              } else {
                this.sweetAlertService.alertSuccess('agent-information');
              }
            },
            error => {
              this.toastService.toastError();
              this.error_list = error;
              this.verifyError();
            }
          );
        } else {
          if (this.url === '/user') {
            this.sweetAlertService.alertPermission('user-list');
          } else {
            this.sweetAlertService.alertPermission('agent-information');
          }
        }
      } else {
        if (this.canUpdate) {
          this.userService.saveEditUser(this.user).subscribe(
            success2 => {
              this.currentId = localStorage.getItem('currentIdPir');
              if (this.currentId === this.user.id) {
                localStorage.removeItem('tokenPir');
                localStorage.removeItem('profileId_rules');
                localStorage.removeItem('currentUserPir');
                localStorage.removeItem('currentIdPir');
                swal( {
                  title: '',
                  text: 'Informações atualizadas com Sucesso!',
                  icon: 'success',
                  buttons: {
                    confirm: {
                      text: 'Fechar',
                      className: 'swal-btn-close'
                    }
                  },
                  closeOnClickOutside: false,
                  className: 'swal-add-success'
                })
                .then((confirm) => {
                  if (confirm) {
                    swal({
                      title: 'Sessão expirada!',
                      text: 'Você precisa efetuar o login novamente!',
                      icon: 'warning',
                      buttons: {
                        ok: {
                          text: 'Ok',
                          className: 'swal-btn-ok'
                        }
                      },
                      closeOnClickOutside: false,
                      className: 'swal-btn-ok'
                    })
                    .then((c) => {
                      if (c) {
                        location.reload();
                      }
                    });
                  }
                });
              } else {
                if (this.url === '/user') {
                  this.sweetAlertService.alertSuccessUpdate('user-list');
                } else {
                  this.sweetAlertService.alertSuccessUpdate('agent-information');
                }
              }
            },
            error => {
              this.error_list = error;
              this.verifyError();
            }
          );
        } else {
          if (this.url === '/user') {
            this.sweetAlertService.alertPermission('user-list');
          } else {
            this.sweetAlertService.alertPermission('agent-information');
          }
        }
      }
    }
  }

  openModal() {
    console.log(this.url);
    if (this.url === '/user') {
      this.modalService.modalCancel('/user-list');
    } else {
      this.modalService.modalCancel('/agent-information');
    }
  }

  public loadProfiles() {
    this.profileService.getProfiles().subscribe(
      success => {
          this.profiles = success;
      },
      error => console.log(error)
    );
  }

  public loadStates(id?: string) {
    this.userService.getStates(id).subscribe(
      success => {
        if (success == null) {
        }
        this.states = success;
      },
      error => console.log(error)
    );
  }

  public loadCities(state_id: string) {
    this.userService.getCities(state_id).subscribe(
      success => {
        if (success == null) {
        }
        this.cities = success.cities;
      },
      error => console.log(error)
    );
  }

  selectType() {
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

  verifyType() {
    this.user.name = this.first_name + ' ' + this.last_name;
    if ( (this.user.password !== undefined) &&
        (this.user.password !== '') &&
        (this.user.password !== null) ) {
      this.user.password = sha256(this.user.password);
    } else {
        this.user.password = undefined;
    }
    this.user.address.postalcode = this.user.address.postalcode.replace('-', '');
    switch (this.user.type) {
      case 'PFIS':
      {
        this.person.cpf = this.person.cpf.split('.').join('');
        this.person.cpf = this.person.cpf.split('-').join('');
        this.user.person = this.person;
        delete this.user.entity;
        this.type = 'PFIS';
        break;
      }

      case 'PJUR':
      {
        this.user.entity = this.entity;
        delete this.user.person;
        this.type = 'PJUR';
        break;
      }
    }
  }

  verifyError() {
    if (this.error_list.length < 7) {
      this.error_list.forEach( er => {
        switch (er) {
          case 'user.cpf.valid': {
            console.log(er);
            this.toastService.toastErrorValid('CPF');
            break;
          }
          case 'user.cpf.invalid': {
            console.log(er);
            this.toastService.toastErrorValid('CPF');
            break;
          }
          case 'user.cnpj.valid': {
            console.log(er);
            this.toastService.toastErrorValid('CNPJ');
            break;
          }
          case 'user.cnpj.invalid': {
            console.log(er);
            this.toastService.toastErrorValid('CNPJ');
            break;
          }
          case 'user.rg.short': {
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
        case 'user.cpf.exists': {
          console.log(er);
          this.toastService.toastErrorExists('CPF');
          break;
        }
        case 'user.cnpj.exists': {
          console.log(er);
          this.toastService.toastErrorExists('CNPJ');
          break;
        }
        case 'user.email.exists': {
          console.log(er);
          this.toastService.toastErrorExists('EMAIL');
          break;
        }
        case 'user.cpf.invalid': {
          console.log(er);
          this.toastService.toastErrorValid('CPF');
          break;
        }
        case 'user.cnpj.invalid': {
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
  }

  isSave() {
    this._isSave = true;
  }

  loadUser() {
    this.loaderService.show();
    this.userService.load(this.urlId).subscribe(
      success => {
        this.user = success[0];
        if (this.user !== undefined) {
          this.first_name = this.user.name.split(' ')[0];
          this.last_name = this.user.name.substring(this.first_name.length + 1);
          if (this.user.person !== undefined ) {
            this.user.type = 'PFIS';
            this.person = new Person();
            this.person = this.user.person;
            this.show_pjur = false;
          } else {
            this.user.type = 'PJUR';
            this.entity = new Org();
            this.entity = this.user.entity;
            this.show_pjur = true;
          }
          this.loadCities(this.user.address.city.state.id);
          this.loadProfiles();
          this.loaderService.hide();
        } else {
            this.user = new User();
            this.entity = new Org();
            this.person = new Person();
        }
        this.hasdata = true;
      },
      error => {
        console.log(error);
        this.loaderService.hide();
      }
    );

  }

   isActive(tab: boolean, t?: number,  p?: number) {
    if ( p !== 0 ) {
      if (t === 1) {
        this.openSaveButtonTab1.click();
      } else {
        if ( t === 2) {
          this.openSaveButtonTab2.click();
        } else {
          if (t === 3) {
            this.isFormValid = true;
          }
        }
      }
    } else {
      this.isFormValid = true;
    }


    if ( this.isFormValid) {
      this.isFormValid = false;
      if (tab) {
        if (this.currentTab === -1) {
              this.currentTab = 0;
        } else if (this.currentTab < 2) {
              this.currentTab++;
              this.cont++;
          }
      }else {
        if (this.currentTab > 0) {
              this.currentTab--;
              this.cont--;
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
            this.accountTab = './assets/img/user/ic_account_enable.png';
            this.personalTab = './assets/img/user/ic_personal_disable.png';
            this.adressTab = './assets/img/user/ic_adress_disable.png';

        }else if (this.currentTab === 1) {
            this.accountTab = './assets/img/user/ic_account_disable.png';
            this.personalTab = './assets/img/user/ic_personal_enable.png';
            this.adressTab = './assets/img/user/ic_adress_disable.png';
            (<HTMLButtonElement>document.getElementById('btn_next')).style.display = '';
            (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = '';
        }else {
            (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
            this.accountTab = './assets/img/user/ic_account_disable.png';
            this.personalTab = './assets/img/user/ic_personal_disable.png';
            this.adressTab = './assets/img/user/ic_adress_enable.png';
            this.next = 'Salvar';
          }
      } else {
        if (t === 1) {
          this.nextTab = '#tab_1';
        } else {
          if (t === 2) {
            this.nextTab = '#tab_2';
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
  ngOnDestroy() {
    localStorage.removeItem('userId');
  }
}
