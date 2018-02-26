import { Permissions, RuleState } from './../../helpers/permissions';
import { Mother } from './../../models/mother';
import { ResponsibleService } from './../../services/responsible/responsible.service';
import { Responsible } from './../../models/responsible';
import { SweetAlertService } from './../../services/sweetalert/sweet-alert.service';
import { ChildService } from './../../services/child/child.service';
import { IMyDpOptions, IMyDateModel, IMyDate, IMyInputFieldChanged } from 'mydatepicker';
import { Child } from './../../models/child';
import { error } from 'util';
import { ToastService } from './../../services/toast-notification/toast.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Community } from '../../models/community';
import { Subscription } from 'rxjs/Subscription';
import { CommunityService } from '../../services/community/community.service';
import { ModalService } from '../../components/modal/modal.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  private child: Child = new Child();
  private subscription: Subscription;
  private isNewData: boolean;
  private urlId: string;
  private data1Tab: string;
  private data2Tab: string;
  private currentTab: number;
  private previousTab: string;
  private nextTab: string;
  private next: string;
  private enable_save: boolean;
  private enable_previous: boolean;
  private cont: number;
  private mothers: Responsible[] = new Array();
  private responsible: Responsible[] = new Array();
  private communities: Community[] = new Array();

  private isCkeckboxValid: boolean;
  private isFormValid: boolean;
  private tab: string;
  private _isSave: boolean;
  private openSaveButtonTab1: HTMLButtonElement;
  private openSaveButtonTab2: HTMLButtonElement;
  private type: any;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  private index1: any;
  private index2: any;
  private who_take_care: string;
  private who_take_care_list: any[] = new Array();
  private _who_take_care: any = [
    {
      description: 'Mãe',
      checked: null,
    },
    {
      description: 'Pai',
      checked: null
    },
    {
      description: 'Irmão/Irmã',
      checked: null
    },
    {
      description: 'Avô/Avó',
      checked: null
    },
    {
      description: 'Tio/Tia',
      checked: null
    },
    {
      description: 'Primo/Prima',
      checked: null
    }
  ];

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sab'},
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul',
                   8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
    todayBtnTxt: 'Hoje'
};
  private selDate: IMyDate = {year: 0, month: 0, day: 0};
  private isValidDate: boolean;

  constructor(
    private communityService: CommunityService,
    private childService: ChildService,
    private responsibleService: ResponsibleService,
    private toastService: ToastService,
    private modalService: ModalService,
    private sweetAlertService: SweetAlertService,
    private permissions: Permissions,
  ) {
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
    }

  ngOnInit() {
    this.permissions.canActivate('/child');
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
        // this.loaderService.hide();
      }
    );
    /*check if is a new or update*/
    this.isNewData = true;
    this.urlId = localStorage.getItem('childId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      this.load();
    }

    this.getMothers();
    this.getResponsible();
    this.getCommunities();
    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';

    this.data1Tab = './assets/img/child/ic_data_enable.png';
    this.data2Tab = './assets/img/child/ic_data_disable.png';

    this.openSaveButtonTab1 = (<HTMLButtonElement>document.getElementById('btn_tab1'));
    this.openSaveButtonTab1.style.display = 'none';

    this.openSaveButtonTab2 = (<HTMLButtonElement>document.getElementById('btn_tab2'));
    this.openSaveButtonTab2.style.display = 'none';

    (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';

    this.isValidDate = true;
    this.isCkeckboxValid = true;
  }

  saveData(isValid: boolean) {
    console.log('isValid', isValid);
    this.updateOptions();

    if (isValid && this._isSave) {
      if (this.child.is_premature_born === false) {
        this.child.born_week = 1;
      }
      if ( !this.child.has_education_diff) {
        this.child.education_diff_specification = '';
      }
      this.child.born_week = Number(this.child.born_week);
      if (this.isNewData || this.child.id === undefined) {
        console.log('save', this.child);
        this.childService.insert(this.child).subscribe(
          success => {
            this.child = success;
            this.isNewData  = false;
            this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
            console.log('saved with success!', this.child);
          },
          error => {
            this.toastService.toastError();
            console.log('save error:', error);
          }
        );
      } else {
        console.log('update', this.child);
        this.childService.update(this.child).subscribe(
          success => {
            this.child = success;
            console.log('updated with success!', this.child);
            this.sweetAlertService.alertSuccessUpdate('child-list');
          },
          error => {
            this.toastService.toastError();
            console.log('update error:', error);
          }
        );
      }
    }
  }

  load() {
    this.childService.load(this.urlId).subscribe(
      success => {
        this.child = success;
        console.log('Load:', this.child);
        this.verifyDataCheckbox();
        this.alterDate();
        if (this.child === undefined) {
          this.child = new Child();
        }
      },
      error => console.log(error)
    );
  }

  alterDate() {
    const dateList = this.child.birth.split('-');
    this.child.birth = dateList[2] + '-' + dateList[1] + '-' + dateList[0];
    const d = new Date(this.child.birth);
    d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
    console.log('Date:', d);
    this.selDate = {year: d.getFullYear(),
                    month: d.getMonth() + 1,
                    day: d.getDate()};
    this.selDate = this.selDate;
  }

  getCommunities() {
    this.communityService._getCommunities().subscribe(
      s => {
        this.communities = s;
      },
      error => console.log(error)
    );
  }

  getMothers() {
    this.subscription = this.responsibleService._getMothers().subscribe(
      success => {
        this.mothers = success;
      },
      error => console.log(error)
    );

  }


  getResponsible() {
    this.subscription = this.responsibleService._getResponsible().subscribe(
      success => {
        this.responsible = success;
        console.log('responsibleList', this.responsible);
      },
      error => console.log(error)
    );
  }

  onDateChanged(event: IMyDateModel) {
    this.selDate = event.date;
    const date = event.date.day + '-' + event.date.month + '-' + event.date.year;
    this.child.birth = date;
    console.log('Date', date);
    console.log('child.birth', this.child.birth );
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    this.isValidDate = event.valid;
    console.log(this.isValidDate);
  }

  verifyDataCheckbox() {
    this.who_take_care = this.child.who_take_care;
    this.who_take_care_list = this.who_take_care.split('|');

    for (let i = 0; i < this._who_take_care.length; i++) {
      for (let j = 0; j < this.who_take_care_list.length; j++ ) {
        if ( this._who_take_care[i].description === this.who_take_care_list[j]) {
          this._who_take_care[i].checked = true;
        }
      }
    }
    console.log('_who_take_care', this._who_take_care);
  }

  updateOptions() {
    if (this.who_take_care_list.length > 0) {
      for (let i = 0; i < this.who_take_care_list.length; i++) {
        if ( i === 0 ) {
          this.who_take_care = this.who_take_care_list[i];
        } else {
          this.who_take_care = this.who_take_care + '|' + this.who_take_care_list[i];
        }
      }
    } else {
      this.who_take_care = '';
    }

    this.child.who_take_care = this.who_take_care;
    console.log('child.who_take_care', this.child.who_take_care);
  }

  verifyCheckbox(option, event) {
    // * CHECKED * /
    console.log('event.target.value ' + event.target.value);
    const value = event.target.value;
    if (event.target.checked) {
      console.log('insert');
      this.who_take_care_list.push(value);

      if (this.who_take_care_list.length === 0) {
        this.isCkeckboxValid = false;
      } else {
        this.isCkeckboxValid = true;
      }

    } else {
      console.log('delete');
      this.index1 = this.who_take_care_list.indexOf(value);
      this.who_take_care_list.splice(this.index1, 1);

      if (this.who_take_care_list.length === 0) {
        this.isCkeckboxValid = false;
      } else {
        this.isCkeckboxValid = true;
      }
    }
  }

  openModal() {
    this.modalService.modalCancel('/child-list');

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

   isActive(tab: boolean, t?: number,  p?: number) {
    //  this.tab = t ;
    console.log('currentTab', this.currentTab);
    if ( p !== 0 ) {
      if (t === 1) {
        this.openSaveButtonTab1.click();
        console.log('openSaveButtonTab1');
      } else {
        if ( t === 2) {
          this.isFormValid = true;
          console.log('openSaveButtonTab2');
        }
      }
    } else {
      this.isFormValid = true;
    }


    if ( this.isFormValid && this.isValidDate ) {
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

        if (this.nextTab === '#tab_2') {
          this.enable_save = true;
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
        } else {
          this.enable_save = false;
        }

        if (this.currentTab === 0) {
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = '';
          this.data1Tab = './assets/img/child/ic_data_enable.png';
          this.data2Tab = './assets/img/child/ic_data_disable.png';

        }else if (this.currentTab === 1) {
          this.data1Tab = './assets/img/child/ic_data_disable.png';
          this.data2Tab = './assets/img/child/ic_data_enable.png';
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = '';
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
        }
      } else {
        if (t === 1) {
          this.nextTab = '#tab_1';
          console.log('nextTab:', this.nextTab);
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
