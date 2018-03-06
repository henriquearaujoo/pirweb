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
  private data1Tab: string;
  private data2Tab: string;
  private data3Tab: string;
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

  private family_income_other_count: number;
  private family_income: any[] = new Array();

  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
    private communityService: CommunityService,
    private responsibleService: ResponsibleService,
    private toastService: ToastService,
    private modalService: ModalService,
    private sweetAlertService: SweetAlertService,
    private permissions: Permissions,
    private route: Router
  ) {
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
  }

  ngOnInit() {
    this.permissions.canActivate('/responsible');
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
    this.urlId = localStorage.getItem('responsibleId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      this.load();
    } else {
      this.route.navigate(['/responsible-list']);
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
    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';

    this.data1Tab = './assets/img/responsible/ic_data_enable.png';
    this.data2Tab = './assets/img/responsible/ic_data_disable.png';
    this.data3Tab = './assets/img/responsible/ic_data_disable.png';

    this.openSaveButtonTab1 = (<HTMLButtonElement>document.getElementById('btn_tab1'));
    this.openSaveButtonTab1.style.display = 'none';

    this.openSaveButtonTab2 = (<HTMLButtonElement>document.getElementById('btn_tab2'));
    this.openSaveButtonTab2.style.display = 'none';

    this.openSaveButtonTab3 = (<HTMLButtonElement>document.getElementById('btn_tab3'));
    this.openSaveButtonTab3.style.display = 'none';

    (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';

    this.isValidDate = true;

    this.income_participation = [
      'Não trabalha e é sustentado pela família',
      'Trabalha e recebe ajuda financeira',
      'Trabalha e é responsável pelo próprio sustento',
      'Trabalha e contribui parcialmente em casa',
      'Trabalha e é a principal responsável pelo sustento da família'
    ];

    this.family_income = ['Pesca', 'Farinha', 'Caça', 'Roçado', 'Outra'];
    this.family_income_other_count = 0;
  }

  saveData(isValid: boolean) {

    if (isValid && this._isSave) {
      this.verifyDate();

      this.responsible.habitation_members_count = Number(this.responsible.habitation_members_count);

      if ( this.responsible.family_income === 'Outra') {
        this.responsible.family_income = this.responsible.family_income_other;
      }

      if ( !this.responsible.drinking_water_treatment2) {
        this.responsible.drinking_water_treatment = 'Não';
      }

      if (this.isNewData || this.responsible.id === undefined) {
        this.responsibleService.insert(this.responsible).subscribe(
          success => {
            this.responsible = success;
            this.isNewData  = false;
            this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
          },
          error => {
            this.toastService.toastError();
            console.log('save error:', error);
          }
        );
      } else {
        this.responsibleService.update(this.responsible).subscribe(
          success => {
            this.sweetAlertService.alertSuccessUpdate('responsible-list');
          },
          error => {
            this.toastService.toastError();
            console.log('updated error:', error);
          }
        );
      }
    }
  }

  onDateChanged(event: IMyDateModel) {
    this.selDate = event.date;
    const date = event.date.day + '-' + event.date.month + '-' + event.date.year;
    this.responsible.birth = date;
  }

  verifyDate() {
    const date = this.selDate.day + '-' + this.selDate.month + '-' + this.selDate.year;
    this.responsible.birth = date;
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    this.isValidDate = event.valid;
  }

  load() {
    this.responsibleService.load(this.urlId).subscribe(
      success => {
        this.responsible = success;
        this.alterData();
        if (this.responsible === undefined) {
          this.responsible = new Responsible();
        }
      },
      error => console.log(error)
    );
  }

  alterData() {
    const dateList = this.responsible.birth.split('-');
    this.responsible.birth = dateList[2] + '-' + dateList[1] + '-' + dateList[0];
    const d = new Date(this.responsible.birth);
    d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
    this.selDate = {year: d.getFullYear(),
                    month: d.getMonth() + 1,
                    day: d.getDate()};
    this.selDate = this.selDate;

    // VERIFY family_income
    for ( let i = 0; i < this.family_income.length; i++ ) {
      if ( this.responsible.family_income === this.family_income[i]) {
        this.family_income_other_count = 1;
      }
    }
    if ( this.family_income_other_count !== 1 ) {
      this.responsible.family_income_other = this.responsible.family_income;
      this.responsible.family_income = 'Outra';
    }

    // VERIFY drinking_water_treatment
    if (this.responsible.drinking_water_treatment === 'Não') {
      this.responsible.drinking_water_treatment2 = false;
      this.responsible.drinking_water_treatment = '';
    } else {
      this.responsible.drinking_water_treatment2 = true;
    }
  }

  getCommunities() {
    this.communityService._getCommunities().subscribe(
      s => {
        this.communities = s;
      },
      error => console.log(error)
    );
  }

  openModal() {
    this.modalService.modalCancel('/responsible-list');

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
          this.data1Tab = './assets/img/responsible/ic_data_enable.png';
          this.data2Tab = './assets/img/responsible/ic_data_disable.png';
          this.data3Tab = './assets/img/responsible/ic_data_disable.png';

        }else if (this.currentTab === 1) {
          this.data1Tab = './assets/img/responsible/ic_data_disable.png';
          this.data2Tab = './assets/img/responsible/ic_data_enable.png';
          this.data3Tab = './assets/img/responsible/ic_data_disable.png';
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = '';
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = '';
        }else {
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
          this.data1Tab = './assets/img/responsible/ic_data_disable.png';
          this.data2Tab = './assets/img/responsible/ic_data_disable.png';
          this.data3Tab = './assets/img/responsible/ic_data_enable.png';
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
    return form.submitted && !field.valid;
  }

  applyCssError(form, field) {
    return {
      'has-error': this.verifyValidSubmitted(form, field),
      'has-feedback': this.verifyValidSubmitted(form, field)
    };
  }

}
