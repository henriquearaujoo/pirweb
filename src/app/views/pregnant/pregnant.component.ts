import { PregnantService } from './../../services/pregnant/pregnant.service';
import { Pregnant } from './../../models/pregnant';
import { error } from 'util';
import { ToastService } from './../../services/toast-notification/toast.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Community } from '../../models/community';
import { Subscription } from 'rxjs/Subscription';
import { CommunityService } from '../../services/community/community.service';
import { ModalService } from '../../components/modal/modal.service';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-pregnant',
  templateUrl: './pregnant.component.html',
  styleUrls: ['./pregnant.component.css']
})
export class PregnantComponent implements OnInit {

  private pregnant: Pregnant = new Pregnant();
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


  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sab'},
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul',
                   8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
    todayBtnTxt: 'Hoje'
};

  constructor(
    private communityService: CommunityService,
    private pregnantService: PregnantService,
    private toastService: ToastService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    /*check if is a new or update*/
    this.isNewData = true;
    this.urlId = localStorage.getItem('pregnantId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      localStorage.removeItem('pregnantId');
      this.load();
    }

    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';

    this.data1Tab = './assets/img/pregnant/ic_data_enable.png';
    this.data2Tab = './assets/img/pregnant/ic_data_disable.png';
    this.data3Tab = './assets/img/pregnant/ic_data_disable.png';

    this.openSaveButtonTab1 = (<HTMLButtonElement>document.getElementById('btn_tab1'));
    this.openSaveButtonTab1.style.display = 'none';

    this.openSaveButtonTab2 = (<HTMLButtonElement>document.getElementById('btn_tab2'));
    this.openSaveButtonTab2.style.display = 'none';

    this.openSaveButtonTab3 = (<HTMLButtonElement>document.getElementById('btn_tab3'));
    this.openSaveButtonTab3.style.display = 'none';

    (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';
  }

  saveData(isValid: boolean) {
    console.log('isValid', isValid);

    if (isValid && this._isSave) {
      if (this.isNewData || this.pregnant.id === undefined) {
        console.log('save');
        // this.communityService.insert(this.pregnant).subscribe(
        //   success => {
        //     this.community = success;
        //     this.isNewData  = false;
        //     this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
        //     console.log('saved with success!', this.community);
        //   },
        //   error => {
        //     this.toastService.toastError();
        //     console.log('update error:', error);
        //   }
        // );
      } else {
        console.log('update');
        this.pregnantService.update(this.pregnant).subscribe(
          success => {
            this.toastService.toastMsg('Sucesso', 'Informações atualizadas com sucesso!');
          },
          error => console.log(error)
        );
      }
    }
  }

  load() {
    this.communityService.load(this.urlId).subscribe(
      success => {
        this.pregnant = success[0];
        console.log('Load:', this.pregnant);
        if (this.pregnant === undefined) {
          this.pregnant = new Pregnant();
        }
      },
      error => console.log(error)
    );
  }

  openModal() {
    this.modalService.modalCancel('/pregnant-list');

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
          this.data1Tab = './assets/img/pregnant/ic_data_enable.png';
          this.data2Tab = './assets/img/pregnant/ic_data_disable.png';
          this.data3Tab = './assets/img/pregnant/ic_data_disable.png';

        }else if (this.currentTab === 1) {
          this.data1Tab = './assets/img/pregnant/ic_data_disable.png';
          this.data2Tab = './assets/img/pregnant/ic_data_enable.png';
          this.data3Tab = './assets/img/pregnant/ic_data_disable.png';
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = '';
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = '';
        }else {
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
          this.data1Tab = './assets/img/pregnant/ic_data_disable.png';
          this.data2Tab = './assets/img/pregnant/ic_data_disable.png';
          this.data3Tab = './assets/img/pregnant/ic_data_enable.png';
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
