import { SweetAlertService } from './../../services/sweetalert/sweet-alert.service';
import { MotherService } from './../../services/mother/mother.service';
import { Mother } from './../../models/mother';
import { error } from 'util';
import { ToastService } from './../../services/toast-notification/toast.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Community } from '../../models/community';
import { Subscription } from 'rxjs/Subscription';
import { CommunityService } from '../../services/community/community.service';
import { ModalService } from '../../components/modal/modal.service';
import { IMyDpOptions, IMyDate, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';

@Component({
  selector: 'app-mother',
  templateUrl: './mother.component.html',
  styleUrls: ['./mother.component.css']
})
export class MotherComponent implements OnInit {

  private mother: Mother = new Mother();
  private subscription: Subscription;
  private communities: Community[] = new Array();
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
  private otherChildren: any  = { has: null};

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
  private income_participation: any[] = new Array();

  constructor(
    private communityService: CommunityService,
    private motherService: MotherService,
    private toastService: ToastService,
    private modalService: ModalService,
    private sweetAlertService: SweetAlertService
  ) {
  }

  ngOnInit() {
    /*check if is a new or update*/
    this.isNewData = true;
    this.urlId = localStorage.getItem('motherId');
    console.log('urlId', this.urlId);
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      this.load();
    }

    this.getCommunities();
    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';

    this.data1Tab = './assets/img/mother/ic_data_enable.png';
    this.data2Tab = './assets/img/mother/ic_data_disable.png';
    this.data3Tab = './assets/img/mother/ic_data_disable.png';

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
  }

  saveData(isValid: boolean) {
    console.log('isValid', isValid);

    if (isValid && this._isSave) {
      this.mother.habitation_members_count = Number(this.mother.habitation_members_count);
      this.mother.children_count = Number(this.mother.children_count);
      if (!this.otherChildren.has) {
        this.mother.children_count = 0;
      }

      if (this.isNewData || this.mother.id === undefined) {
        console.log('save', this.mother);
        this.motherService.insert(this.mother).subscribe(
          success => {
            this.mother = success;
            this.isNewData  = false;
            this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
            console.log('saved with success!', this.mother);
          },
          error => {
            this.toastService.toastError();
            console.log('save error:', error);
          }
        );
      } else {
        console.log('update', this.mother);
        this.motherService.update(this.mother).subscribe(
          success => {
            this.sweetAlertService.alertSuccessUpdate('mother-list');
            console.log('saved with success!', this.mother);
          },
          error => {
            this.toastService.toastError();
            console.log('update error:', error);
          }
        );
      }
    }
  }

  onDateChanged(event: IMyDateModel) {
    this.selDate = event.date;
    const date = event.date.day + '-' + event.date.month + '-' + event.date.year;
    this.mother.birth = date;
    console.log('Date', date);
    console.log('mother.birth', this.mother.birth );
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    this.isValidDate = event.valid;
    console.log(this.isValidDate);
  }

  load() {
    this.motherService.load(this.urlId).subscribe(
      success => {
        this.mother = success;
        console.log('Load:', this.mother);
        this.alterDate();
        if (this.mother.children_count === 0) {
          this.otherChildren.has = false;
        } else {
          this.otherChildren.has = true;
        }
        if (this.mother === undefined) {
          this.mother = new Mother();
        }
      },
      error => console.log(error)
    );
  }

  alterDate() {
    const dateList = this.mother.birth.split('-');
    this.mother.birth = dateList[2] + '-' + dateList[1] + '-' + dateList[0];
    const d = new Date(this.mother.birth);
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

  openModal() {
    this.modalService.modalCancel('/mother-list');

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
          this.data1Tab = './assets/img/mother/ic_data_enable.png';
          this.data2Tab = './assets/img/mother/ic_data_disable.png';
          this.data3Tab = './assets/img/mother/ic_data_disable.png';

        }else if (this.currentTab === 1) {
          this.data1Tab = './assets/img/mother/ic_data_disable.png';
          this.data2Tab = './assets/img/mother/ic_data_enable.png';
          this.data3Tab = './assets/img/mother/ic_data_disable.png';
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = '';
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = '';
        }else {
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
          this.data1Tab = './assets/img/mother/ic_data_disable.png';
          this.data2Tab = './assets/img/mother/ic_data_disable.png';
          this.data3Tab = './assets/img/mother/ic_data_enable.png';
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
    return form.submitted && !field.valid;
  }

  applyCssError(form, field) {
    return {
      'has-error': this.verifyValidSubmitted(form, field),
      'has-feedback': this.verifyValidSubmitted(form, field)
    };
  }

}
