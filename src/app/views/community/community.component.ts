import { SweetAlertService } from './../../services/sweetalert/sweet-alert.service';
import { Types } from './../../models/types';
import { IMyDpOptions } from 'mydatepicker';
import { error } from 'util';
import { ToastService } from './../../services/toast-notification/toast.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Community } from '../../models/community';
import { Subscription } from 'rxjs/Subscription';
import { CommunityService } from '../../services/community/community.service';
import { ModalService } from '../../components/modal/modal.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  private community: Community = new Community();
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
  private cities: any[] = new Array();

  private isFormValid: boolean;
  private isCkeckboxValid: boolean;
  private tab: string;
  private _isSave: boolean;
  private openSaveButtonTab1: HTMLButtonElement;
  private openSaveButtonTab2: HTMLButtonElement;
  private openSaveButtonTab3: HTMLButtonElement;

  private type: any;
  private culturalProduction: string;
  private culturalProduction_list: any[] = new Array();
  private _culturalProducion: any = [
    {
      type: 'Artesanato',
      checked: null,
    },
    {
      type: 'Música',
      checked: null
    },
    {
      type: 'Dança',
      checked: null
    }
  ];

  private waterSupply: string;
  private waterSupply_list: any[] = new Array();
  private _waterSupply: any = [
    {
      type: 'Encanada',
      checked: null
    },
    {
      type: 'Tratada',
      checked: null
    },
    {
      type: 'Poços',
      checked: null
    },
    {
      // tslint:disable-next-line:quotemark
      type: "Caixa d'água",
      checked: null
    }
  ];

  private index1: any;
  private index2: any;


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
    private toastService: ToastService,
    private modalService: ModalService,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit() {
    /*check if is a new or update*/
    this.isNewData = true;
    this.urlId = localStorage.getItem('communityId');
    console.log('urlId', this.urlId);
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      localStorage.removeItem('communityId');
      this.load();
    }

    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';

    this.data1Tab = './assets/img/community/ic_dataTab1_enable.png';
    this.data2Tab = './assets/img/community/ic_dataTab2_disable.png';

    this.openSaveButtonTab1 = (<HTMLButtonElement>document.getElementById('btn_tab1'));
    this.openSaveButtonTab1.style.display = 'none';

    this.openSaveButtonTab2 = (<HTMLButtonElement>document.getElementById('btn_tab2'));
    this.openSaveButtonTab2.style.display = 'none';

    // this.openSaveButtonTab3 = (<HTMLButtonElement>document.getElementById('btn_tab3'));
    // this.openSaveButtonTab3.style.display = 'none';

    (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';

    this.culturalProduction = '';
    this.isCkeckboxValid = true;

    this.getCities();
  }

  saveData(isValid: boolean) {
    console.log('isValid', isValid);
    this.updateOptions();

    if (isValid && this._isSave) {
      if (this.isNewData || this.community.id === undefined) {
        console.log('save', this.community);
        this.communityService.insert(this.community).subscribe(
          success => {
            this.community = success;
            this.isNewData  = false;
            this.sweetAlertService.alertSuccess('community-list');
            console.log('saved with success!', this.community);
          },
          error => {
            this.toastService.toastError();
            console.log('save error:', error);
          }
        );
      } else {
        console.log('update', this.community);
        this.communityService.update(this.community).subscribe(
          success => {
            this.community = success;
            console.log('updated with success!', this.community);
            this.sweetAlertService.alertSuccessUpdate('community-list');
          },
          error => {
            this.toastService.toastError();
            console.log('update error:', error);
          }
        );
      }
    }
  }

  verifyDataCheckbox() {
    this.culturalProduction = this.community.cultural_production;
    this.culturalProduction_list = this.culturalProduction.split('|');

    this.waterSupply = this.community.water_supply;
    this.waterSupply_list = this.waterSupply.split('|');

    for (let i = 0; i < this._waterSupply.length; i++) {
      for (let j = 0; j < this.waterSupply_list.length; j++ ) {
        if ( this._waterSupply[i].type === this.waterSupply_list[j]) {
          this._waterSupply[i].checked = true;
        }
      }
    }

    for (let i = 0; i < this._culturalProducion.length; i++) {
      for (let j = 0; j < this.culturalProduction_list.length; j++ ) {
        if ( this._culturalProducion[i].type === this.culturalProduction_list[j]) {
          this._culturalProducion[i].checked = true;
        }
      }
    }
    console.log('_waterSupply', this._waterSupply);

    // for (let i = 0; i < this.waterSupply_list.length; i++) {
    //   if ( i === 0 ) {
    //     this.waterSupply = this.waterSupply_list[i];
    //   } else {
    //     this.waterSupply = this.waterSupply + '|' + this.waterSupply_list[i];
    //   }
    // }
    // this.community.cultural_production = this.culturalProduction;
    // this.community.water_supply = this.waterSupply;
    // console.log('culturalProduction', this.community.cultural_production );
    // console.log('water_supply', this.community.water_supply);
  }

  load() {
    this.communityService.load(this.urlId).subscribe(
      success => {
        this.community = success;
        console.log('Load:', this.community);
        this.verifyDataCheckbox();
        if (this.community === undefined) {
          this.community = new Community();
        }
      },
      error => console.log(error)
    );
  }

  openModal() {
    this.modalService.modalCancel('/community-list');

  }

  updateOptions() {
    if (this.culturalProduction_list.length > 0) {
      for (let i = 0; i < this.culturalProduction_list.length; i++) {
        if ( i === 0 ) {
          this.culturalProduction = this.culturalProduction_list[i];
        } else {
          this.culturalProduction = this.culturalProduction + '|' + this.culturalProduction_list[i];
        }
      }
    } else {
      this.culturalProduction = '';
    }

    if (this.waterSupply_list.length > 0 ) {
      for (let i = 0; i < this.waterSupply_list.length; i++) {
        if ( i === 0 ) {
          this.waterSupply = this.waterSupply_list[i];
        } else {
          this.waterSupply = this.waterSupply + '|' + this.waterSupply_list[i];
        }
      }
    } else {
      this.waterSupply = '';
    }

    this.community.cultural_production = this.culturalProduction;
    this.community.water_supply = this.waterSupply;
    console.log('culturalProduction', this.community.cultural_production );
    console.log('water_supply', this.community.water_supply);
  }

  verifyCheckbox(option, event) {
    // * CHECKED * /
    console.log('event.target.value ' + event.target.value);
    const value = event.target.value;
    // const index1 = this.culturalProduction_list.indexOf(value);
    // const index2 = this.waterSupply_list.indexOf(value);
    if (event.target.checked) {
      console.log('insert');
      switch (option) {
        case 1:
          this.culturalProduction_list.push(value);

          if (this.culturalProduction_list.length === 0) {
            this.isCkeckboxValid = false;
          } else {
            this.isCkeckboxValid = true;
          }
          break;
        case 2:
          this.waterSupply_list.push(value);

          if (this.waterSupply_list.length === 0) {
            this.isCkeckboxValid = false;
          } else {
            this.isCkeckboxValid = true;
          }
        break;
      }
    } else {
      console.log('delete');
      switch (option) {
        case 1:
          this.index1 = this.culturalProduction_list.indexOf(value);
          this.culturalProduction_list.splice(this.index1, 1);

          if (this.culturalProduction_list.length === 0) {
            this.isCkeckboxValid = false;
          } else {
            this.isCkeckboxValid = true;
          }
        break;
        case 2:
          this.index2 = this.waterSupply_list.indexOf(value);
          this.waterSupply_list.splice(this.index2, 1);

          if (this.waterSupply_list.length === 0) {
            this.isCkeckboxValid = false;
          } else {
            this.isCkeckboxValid = true;
          }
        break;
      }
    }
  }

  getCities() {
    this.communityService.getCities().subscribe(
      s => {
        this.cities = s;
      },
      error => console.log(error)
    );
  }

  save(tab: string, isValid: boolean) {
    this.isFormValid = isValid;
    this.tab = tab;
    this._isSave = false;
    console.log('tab:', tab);
    console.log('isValid:', isValid);
    console.log('isSave:', this._isSave);
    console.log('isCkeckboxValid:', this.isCkeckboxValid);
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
          // this.openSaveButtonTab2.click();
          // console.log('openSaveButtonTab2');
        }
      }
    } else {
      this.isFormValid = true;
    }


    if ( this.isFormValid && this.isCkeckboxValid) {
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
        } else {
          this.enable_save = false;
        }

        if (this.currentTab === 0) {
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';
          this.data1Tab = './assets/img/community/ic_dataTab1_enable.png';
          this.data2Tab = './assets/img/community/ic_dataTab2_disable.png';

        }else if (this.currentTab === 1) {
          this.data1Tab = './assets/img/community/ic_dataTab1_disable.png';
          this.data2Tab = './assets/img/community/ic_dataTab2_enable.png';
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = '';
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = '';
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

