import { User } from './../../models/user';
import { Agent } from './../../models/agent';
import { UserService } from './../../services/user/user.service';
import { SweetAlert2Service } from './../../services/sweetalert/sweet-alert.2service';
import { LoaderService } from './../../services/loader/loader.service';
import { Permissions, RuleState } from './../../helpers/permissions';
import { SweetAlertService } from './../../services/sweetalert/sweet-alert.service';
import { ResponsibleService } from './../../services/responsible/responsible.service';
import { Responsible } from './../../models/responsible';
import { error } from 'util';
import { ToastService } from './../../services/toast-notification/toast.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Community } from '../../models/community';
import { Subscription } from 'rxjs/Subscription';
import { CommunityService } from '../../services/community/community.service';
import { ModalService } from '../../components/modal/modal.service';
import { IMyDpOptions, IMyDateModel, IMyDate, IMyInputFieldChanged } from 'mydatepicker';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responsible',
  templateUrl: './responsible.component.html',
  styleUrls: ['./responsible.component.css']
})
export class ResponsibleComponent implements OnInit {

  private responsible: Responsible = new Responsible();
  private subscription: Subscription;
  private isNewData: boolean;
  private urlId: string;
  private infoTab: string;
  private dataTab: string;
  private servicesTab: string;
  private currentTab: number;
  private previousTab: string;
  private nextTab: string;
  private next: string;
  private enable_save: boolean;
  private enable_previous: boolean;
  private cont: number;

  private isFormValid: boolean;
  private tab: string;
  private _isSave: boolean;
  private openSaveButtonTab1: HTMLButtonElement;
  private openSaveButtonTab2: HTMLButtonElement;
  private openSaveButtonTab3: HTMLButtonElement;
  private type: any;
  private communities: Community[] = new Array();

  private dateDisable = new Date();
  public myDatePickerOptions: IMyDpOptions;

  private selDate: IMyDate = {year: 0, month: 0, day: 0};
  private isValidDate: boolean;
  private income_participation: any[] = new Array();
  private isCkeckboxValid: boolean;

  private family_income_other_count: number;
  private family_income: any[] = new Array();
  private otherChildren: any  = { has: null};
  private family_income_list: any[] = new Array();
  private isIcome_other: boolean;
  private agents: User[] = new Array();
  private hasCommunities: boolean;
  private hasAgents: boolean;

  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private onChange: boolean;

  constructor(
    private communityService: CommunityService,
    private responsibleService: ResponsibleService,
    private userService: UserService,
    private toastService: ToastService,
    private modalService: ModalService,
    private sweetAlertService: SweetAlertService,
    private sweetAlert2Service: SweetAlert2Service,
    private loaderService: LoaderService,
    private permissions: Permissions,
    private route: Router
  ) {
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
  }

  ngOnInit() {
    this.permissions.canActivate(['/familias/registro']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    /*check if is a new or update*/
    this.isNewData = true;
    this.urlId = localStorage.getItem('familyId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      this.load();
    } else {
      // this.route.navigate(['/familias']);
    }

    this.dateDisable.setMinutes( this.dateDisable.getMinutes() + this.dateDisable.getTimezoneOffset() );
    this.myDatePickerOptions  = {
      // other options...
      dateFormat: 'dd/mm/yyyy',
      dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sab'},
      monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul',
                     8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
      todayBtnTxt: 'Hoje',
      showTodayBtn: false,
      disableSince: {year: this.dateDisable.getFullYear(), month: this.dateDisable.getMonth() + 1, day: this.dateDisable.getDate()}
  };

    this.getCommunities();
    this.loadAgents();
    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';

    this.infoTab = './assets/img/pregnant/ic_section_info_enable.png';
    this.dataTab = './assets/img/pregnant/ic_section_info_data_disable.png';
    this.servicesTab = './assets/img/pregnant/ic_section_info_services_disable.png';

    this.openSaveButtonTab1 = (<HTMLButtonElement>document.getElementById('btn_tab1'));
    this.openSaveButtonTab1.style.display = 'none';

    this.openSaveButtonTab2 = (<HTMLButtonElement>document.getElementById('btn_tab2'));
    this.openSaveButtonTab2.style.display = 'none';

    this.openSaveButtonTab3 = (<HTMLButtonElement>document.getElementById('btn_tab3'));
    this.openSaveButtonTab3.style.display = 'none';

    (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';

    this.isValidDate = true;

    this.income_participation = [
      'Não trabalha e é sustentado pela familia',
      'Trabalha e recebe ajuda financeira',
      'Trabalha e é responsável pelo próprio sustento',
      'Trabalha e contribui parcialmente em casa',
      'Trabalha e é a principal responsável pelo sustento da familia'
    ];

    this.family_income = [
      {
        type: 'PESCA',
        checked: null
      },
      {
        type: 'FARINHA',
        checked: null
      },
      {
        type: 'CAÇA',
        checked: null
      },
      {
        type: 'ROÇADO',
        checked: null
      },
      {
        type: 'PROGRAMAS SOCIAIS',
        checked: null
      },
      {
        type: 'OUTRA',
        checked: null
      }
    ];
    this.family_income_other_count = 0;
  }

  saveData(form1, fomr2, form3) {
    const isValid = form1 && fomr2 && form3;

    console.log(this.responsible);
    if (isValid && this._isSave) {
      this.updateOptions();

      for (let i = 0; i < this.communities.length; i++) {
        if ( this.responsible.community.id === this.communities[i].id) {
          this.responsible.community =  this.communities[i];
          this.responsible.community_id = this.communities[i].id;
          this.responsible.community.city_id =  this.responsible.community.city.id;
          break;
        }
      }

      delete this.responsible.children;

      this.responsible.agent_id = this.responsible.agent.person.agent.id;

      this.responsible.community.city.state.cities = [];

      // delete this.responsible.community;
      // delete this.responsible.pregnant;

      if (this.isNewData || this.responsible.id === undefined) {
        this.responsibleService.insert(this.responsible).subscribe(
          success => {
            // this.responsible = success;
            this.isNewData  = false;
            this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
          },
          error => {
            this.toastService.toastError();
            console.log('save error:', error);
          }
        );
      } else {
        // console.log(this.responsible);
        this.responsibleService.update(this.responsible).subscribe(
          success => {
            this.responsible = success;
            console.log(success);
            this.sweetAlertService.alertSuccessUpdate('/familias');
          },
          error => {
            this.toastService.toastError();
            console.log('updated error:', error);
          }
        );
      }
    } else {
      if (!isValid) {
        this.toastService.toastMsgError('Erro', 'Preencha todos os campos obrigatórios do formulário!');
      }
    }
  }

  loadAgents() {
    this.userService.getAllAgents().subscribe(
      s => {
        this.agents = s;
        console.log(this.agents);
        this.hasAgents = true;
      },
      error => console.log(error)
    );
  }

  updateOptions() {
    let income = '';
    if (this.family_income_list.length > 0) {
      for (let i = 0; i < this.family_income_list.length; i++) {
        if ( i === 0 ) {
          income = this.family_income_list[i];
        } else {
          income = income + ',' + this.family_income_list[i];
        }
      }
    } else {
      income = '';
    }

    this.responsible.family_income = income;
  }

  verifyDataCheckbox() {
    const icome = this.responsible.family_income;
    this.family_income_list = icome.split(',');
    if (this.responsible.family_income_other !== undefined &&
        this.responsible.family_income_other !== '') {
          this.isIcome_other = true;
          // this.family_income_list.push(this.responsible.family_income_other);
        }

    for (let i = 0; i < this.family_income.length; i++) {
      for (let j = 0; j < this.family_income_list.length; j++ ) {
        if ( this.family_income[i].type === this.family_income_list[j]) {
          this.family_income[i].checked = true;
        }
      }
    }
  }

  verifyCheckbox(event) {
    // * CHECKED * /
    const value = event.target.value;
    if (event.target.checked) {
      if (value === 'OUTRA') {
        this.isIcome_other = true;
      }
      this.family_income_list.push(value);

      if (this.family_income_list.length === 0) {
        this.isCkeckboxValid = false;
      } else {
        this.isCkeckboxValid = true;
      }
    } else {
      if (value === 'OUTRA') {
        this.isIcome_other = false;
      }
      const index = this.family_income_list.indexOf(value);
      this.family_income_list.splice(index, 1);

      if (this.family_income_list.length === 0) {
        this.isCkeckboxValid = false;
      } else {
        this.isCkeckboxValid = true;
      }
    }
  }

  onDateChanged(event: IMyDateModel) {
    this.selDate = event.date;
    const date = event.date.year + '-' + event.date.month + '-' + event.date.day;
    this.responsible.birth = date;
  }

  loadBirthDate():  void {
    const date: string = this.responsible.birth;
    const brokeDate: string[] = date.split('-');
    this.selDate = {day: parseInt(brokeDate[2], 10), month: parseInt(brokeDate[1], 10), year: parseInt(brokeDate[0], 10)};
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    this.isValidDate = event.valid;
  }

  load() {
    this.loaderService.show();
    this.responsibleService.load(this.urlId).subscribe(
      success => {
        this.responsible = success;
        console.log(this.responsible);
        this.verifyDataCheckbox();
        this.alterData();
        this.loadBirthDate();
        // if (this.responsible.children_count === 0) {
        //   this.otherChildren.has = false;
        // } else {
        //   this.otherChildren.has = true;
        // }
        this.loaderService.hide();
        if (this.responsible === undefined) {
          this.responsible = new Responsible();
        }
      },
      error => {
        this.loaderService.hide();
        console.log(error);
      }
    );
  }

  alterData() {
    // VERIFY family_income
    // for ( let i = 0; i < this.family_income.length; i++ ) {
    //   if ( this.responsible.family_income === this.family_income[i]) {
    //     this.family_income_other_count = 1;
    //   }
    // }
    // if ( this.family_income_other_count !== 1 ) {
    //   this.responsible.family_income_other = this.responsible.family_income;
    //   this.responsible.family_income = 'Outra';
    // }

    // VERIFY drinking_water_treatment
    if ((this.responsible.water_treatment_description !== undefined) &&
       (this.responsible.water_treatment_description !== '')) {
      this.responsible.drinking_water_treatment = true;
    } else {
      this.responsible.drinking_water_treatment = false;
    }
  }

  getCommunities() {
    this.communityService._getCommunities().subscribe(
      s => {
        this.communities = s;
        this.hasCommunities = true;
      },
      error => console.log(error)
    );
  }

  openModal() {
    this.modalService.modalCancel('/familias');

  }

  onCancel() {
    if (this.onChange) {
      this.sweetAlert2Service.alertToSave()
      .then((result) => {
        if (result.value) {
          this._isSave = true;
          this.openSaveButtonTab3.click();
        } else {
          this.route.navigate(['/familias']);
        }
      });
    } else {
      this.openModal();
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

    if ( this.isFormValid && this.isValidDate) {
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
          this.infoTab = './assets/img/pregnant/ic_section_info_enable.png';
          this.dataTab = './assets/img/pregnant/ic_section_info_data_disable.png';
          this.servicesTab = './assets/img/pregnant/ic_section_info_services_disable.png';

        }else if (this.currentTab === 1) {
          this.infoTab = './assets/img/pregnant/ic_section_info_disable.png';
          this.dataTab = './assets/img/pregnant/ic_section_info_data_enable.png';
          this.servicesTab = './assets/img/pregnant/ic_section_info_services_disable.png';
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = '';
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = '';
        }else {
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
          this.infoTab = './assets/img/pregnant/ic_section_info_disable.png';
          this.dataTab = './assets/img/pregnant/ic_section_info_data_disable.png';
          this.servicesTab = './assets/img/pregnant/ic_section_info_services_enable.png';
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

}
