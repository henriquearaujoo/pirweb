import { IMyDateModel, IMyDate, IMyInputFieldChanged, IMyDpOptions } from 'mydatepicker';
import { Unity } from './../../models/unity';
import { Regional } from './../../models/regional';
import { Agent } from './../../models/agent';
import { SweetAlert2Service } from './../../services/sweetalert/sweet-alert.2service';
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
import { RegionalService } from '../../services/regional/regional.service';

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
  private agent: Agent = new Agent();
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
  private agentTab: string;
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
  private openSaveButtonTab4: HTMLButtonElement;
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
  private isWhitespace: boolean;
  private onChange: boolean;
  private isTypeAgent: boolean;
  private password: string;
  private citiesOfActivity: any[] = new Array();
  private regionais: Regional[] = new Array();
  private unities: Unity[] = new Array();
  private isValidDate: boolean;
  private selDate: IMyDate = {year: 0, month: 0, day: 0};
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sab'},
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul',
                   8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
    todayBtnTxt: 'Hoje'
};

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private modalService: ModalService,
    private permissions: Permissions,
    private sweetAlertService: SweetAlertService,
    private sweetAlert2Service: SweetAlert2Service,
    private regionalService: RegionalService,
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
    this.permissions.canActivate(['/usuarios/registro', '/agente-dashboard/registro']);
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
    this.getRegionais();
    if (this.urlId !== undefined && this.urlId !== '' && this.urlId !== null) {
      this.isNewData = false;
      this.loadUser();
    } else {
      this.loaderService.hide();
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
    this.agentTab = './assets/img/user/ic_dataTab_disable.png';

    this.enable_save = false;
    this.cont = 0;
    this.modalSave = '#modal-default';

    this.openSaveButtonTab1 = (<HTMLButtonElement>document.getElementById('btn_tab1'));
    this.openSaveButtonTab1.style.display = 'none';

    this.openSaveButtonTab2 = (<HTMLButtonElement>document.getElementById('btn_tab2'));
    this.openSaveButtonTab2.style.display = 'none';

    this.openSaveButtonTab3 = (<HTMLButtonElement>document.getElementById('btn_tab3'));
    this.openSaveButtonTab3.style.display = 'none';

    this.openSaveButtonTab4 = (<HTMLButtonElement>document.getElementById('btn_tab4'));
    this.openSaveButtonTab4.style.display = 'none';

    (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';

    this.isValidDate = true;
  }

  saveData(form1, fomr2, form3) {
    const isValid = form1 && fomr2 && form3;
    if (isValid && this._isSave) {
      this.modalOpened = false;
      this.verifyType();
      if (this.isTypeAgent) {
        this.verifyDate();
        if ( this.user.person.agent.latitude === null && this.user.person.agent.longitude == null) {
          this.user.person.agent.latitude = 0;
          this.user.person.agent.longitude = 0;
        }
      }
      this.user.profile_id = this.user.profile.id;
      this.user.address.city_id = this.user.address.city.id;
      this.user.profile.description = '';
      this.user.profile.updated_at = '';
      this.user.address.city.state.cities = [];

      if (this.isNewData || this.user.id === undefined) {
        if (this.canCreate) {
          this.userService.createUser(this.user).subscribe(
            success => {
              if (this.url === '/usuarios/registro') {
                this.sweetAlertService.alertSuccess('/usuarios');
              } else {
                this.sweetAlertService.alertSuccess('/agente-dashboard');
              }
            },
            error => {
              this.user.password = this.password;
              // this.toastService.toastError();
              this.error_list = error;
              this.verifyError();
            }
          );
        } else {
          if (this.url === '/usuarios/registro') {
            this.sweetAlertService.alertPermission('/usuarios');
          } else {
            this.sweetAlertService.alertPermission('/agente-dashboard');
          }
        }
      } else {
        if (this.canUpdate) {
          delete this.user.visits;
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
                      text: 'Você precisa efetuar o login novamente para aplicar as alterações no seu usuário!',
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
                if (this.url === '/usuarios/registro') {
                  this.sweetAlertService.alertSuccessUpdate('/usuarios');
                } else {
                  this.sweetAlertService.alertSuccessUpdate('/agente-dashboard');
                }
              }
            },
            error => {
              this.user.password = this.password;
              this.error_list = error;
              this.verifyError();
            }
          );
        } else {
          if (this.url === '/usuarios/registro') {
            this.sweetAlertService.alertPermission('/usuarios');
          } else {
            this.sweetAlertService.alertPermission('/agente-dashboard');
          }
        }
      }
    } else {
      if (!isValid) {
        this.toastService.toastMsgError('Erro', 'Preencha todos os campos obrigatórios do formulário!');
      }
    }
  }

  changeProfile() {
    this.profiles.forEach( elem => {
        if (elem.id === this.user.profile.id) {
          this.profile = elem;
          if (this.profile.type === 'AGENT') {
            this.isTypeAgent = true;
            this.user.type = 'PFIS';
            this.selectType();
            if (this.user.person.agent === undefined) {
              this.user.person.agent = new Agent();
            }
          } else {
            this.isTypeAgent = false;
          }
        }
      });
  }

  getRegionais() {
    this.regionalService.getAll().subscribe(
      success => {
        this.regionais = success;
        console.log(this.regionais);
      },
      error => {
        console.log(error);
      }
    );
  }

  changeDate() {
    const dateList = this.user.person.agent.birth.split('-');
    this.user.person.agent.birth = dateList[2] + '-' + dateList[1] + '-' + dateList[0];
    const d = new Date(this.user.person.agent.birth);
    console.log(d);
    d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
    this.selDate = {year: d.getFullYear(),
                    month: d.getMonth() + 1,
                    day: d.getDate()};
    this.selDate = this.selDate;
  }

  onDateChanged(event: IMyDateModel) {
    this.selDate = event.date;
    const date = event.date.day + '-' + event.date.month + '-' + event.date.year;
    this.user.person.agent.birth = date;
  }

  verifyDate() {
    const date = this.selDate.year + '-' + this.selDate.month + '-' + this.selDate.day;
    const d = new Date(date);
    const currentMonth = ('0' + (d.getMonth() + 1)).slice(-2);
    const currentDay = ('0' + d.getDate()).slice(-2);
    this.user.person.agent.birth = this.selDate.year + '-' + currentMonth + '-' + currentDay;
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    this.isValidDate = event.valid;
  }

  getUnities() {
    this.regionais.filter( elem => {
        if (elem.id === this.agent.regional.id) {
          this.unities = elem.unities;
        }
      });
    if (this.unities !== undefined) {
      if (this.unities.length > 0) {
        this.agent.unity = this.unities[0];
      }
    }
    this.getCities();
  }

  getCities() {
    this.unities.filter( elem => {
      if (elem.id === this.agent.unity.id) {
        this.citiesOfActivity = elem.cities;
      }
    });
  }

  openModal() {
    if (this.url === '/usuarios/registro') {
      this.modalService.modalCancel('/usuarios');
    } else {
      this.modalService.modalCancel('/agente-dashboard');
    }
  }

  onCancel() {
    if (this.onChange) {
      if (this.url === '/usuarios/registro') {
        this.sweetAlert2Service.alertToSave()
        .then((result) => {
          if (result.value) {
            this._isSave = true;
            if (this.isTypeAgent) {
              this.openSaveButtonTab4.click();
            } else {
              this.openSaveButtonTab3.click();
            }
          } else {
            this.router.navigate(['/usuarios']);
          }
        });
      } else {
        this.sweetAlert2Service.alertToSave()
        .then((result) => {
          if (result.value) {
            this._isSave = true;
            if (this.isTypeAgent) {
              this.openSaveButtonTab4.click();
            } else {
              this.openSaveButtonTab3.click();
            }
          } else {
            this.router.navigate(['/agente-dashboard']);
          }
        });
      }
    } else {
      if (this.url === '/usuarios/registro') {
        this.modalService.modalCancel('/usuarios');
      } else {
        this.modalService.modalCancel('/agente-dashboard');
      }
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
      this.password = this.user.password;
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
        if (this.isTypeAgent) {
          this.user.person.agent = this.agent;
        } else {
          delete this.user.person.agent;
        }
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
        case 'login.violation': {
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
        case 'email.found': {
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
        this.user = success;
        console.log(this.user);
        if (this.user !== undefined) {
          this.first_name = this.user.name.split(' ')[0];
          this.last_name = this.user.name.substring(this.first_name.length + 1);
          if ((this.user.person !== undefined) && (this.user.person !== null)) {
            this.user.type = 'PFIS';
            this.person = new Person();
            this.person = this.user.person;
            if (this.user.profile.type === 'AGENT') {
              this.isTypeAgent = true;
              this.agent = this.user.person.agent;
              this.changeDate();
              this.regionais.filter( elem => {
                if (elem.id === this.agent.unity.regional.id) {
                  this.agent.regional = elem;
                }
              });
              this.unities = this.agent.regional.unities;
              this.getCities();
            }
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

  alterData() {
    // ALTER DATE
    const dateList = this.user.person.agent.birth.split('-');
    this.user.person.agent.birth = dateList[2] + '-' + dateList[1] + '-' + dateList[0];
    const d = new Date(this.user.person.agent.birth);
    d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
    this.selDate = {year: d.getFullYear(),
                    month: d.getMonth() + 1,
                    day: d.getDate()};
    this.selDate = this.selDate;
  }

   isActive(tab: boolean, t?: number,  p?: number) {
    if ( p !== 0 ) {
      if (t === 1) {
        this.openSaveButtonTab1.click();
      } else if ( t === 2) {
        this.openSaveButtonTab2.click();
      } else if ( t === 3) {
        this.openSaveButtonTab3.click();
      } else if (t === 4) {
          this.isFormValid = true;
      }
      // if (t === 1) {
      //   this.openSaveButtonTab1.click();
      // } else {
      //   if ( t === 2) {
      //     this.openSaveButtonTab2.click();
      //   } else if ( t === 3) {
      //     this.openSaveButtonTab3.click();
      //   } else {
      //     if (t === 4) {
      //       this.isFormValid = true;
      //     }
      //   }
      // }
    } else {
      this.isFormValid = true;
    }

    if ( this.isFormValid) {
      this.isFormValid = false;
      if (tab) {
        if (this.currentTab === -1) {
              this.currentTab = 0;
        } else if ((this.isTypeAgent && this.currentTab < 3) || (!this.isTypeAgent && this.currentTab < 2)) {
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

        let lastTab = '#tab_3';
        if (this.isTypeAgent) {
          lastTab = '#tab_4';
        }
        if (this.nextTab === lastTab) {
          this.enable_save = true;
        } else {
          this.enable_save = false;
        }

        if (this.currentTab === 0) {
            (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';
            this.accountTab = './assets/img/user/ic_account_enable.png';
            this.personalTab = './assets/img/user/ic_personal_disable.png';
            this.adressTab = './assets/img/user/ic_adress_disable.png';
            this.agentTab = './assets/img/user/ic_dataTab_disable.png';

        }else if (this.currentTab === 1) {
            this.accountTab = './assets/img/user/ic_account_disable.png';
            this.personalTab = './assets/img/user/ic_personal_enable.png';
            this.adressTab = './assets/img/user/ic_adress_disable.png';
            this.agentTab = './assets/img/user/ic_dataTab_disable.png';
            (<HTMLButtonElement>document.getElementById('btn_next')).style.display = '';
            (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = '';
        } else if (this.currentTab === 2) {
            (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
            this.accountTab = './assets/img/user/ic_account_disable.png';
            this.personalTab = './assets/img/user/ic_personal_disable.png';
            this.adressTab = './assets/img/user/ic_adress_enable.png';
            this.agentTab = './assets/img/user/ic_dataTab_disable.png';
            this.next = 'Salvar';
        } else {
            (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
            this.accountTab = './assets/img/user/ic_account_disable.png';
            this.personalTab = './assets/img/user/ic_personal_disable.png';
            this.adressTab = './assets/img/user/ic_adress_disable.png';
            this.agentTab = './assets/img/user/ic_dataTab_enable.png';
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
    if (field.dirty) {
      this.onChange = true;
    }
      return (field.dirty || field.touched || form.submitted) && !field.valid;
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
