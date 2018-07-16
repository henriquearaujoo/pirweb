import { PagenateComponent } from './../../../../components/pagenate/pagenate.component';
import { PageService } from './../../../../services/pagenate/page.service';
import { LoaderService } from './../../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../../helpers/permissions';
import { SweetAlert2Service } from './../../../../services/sweetalert/sweet-alert.2service';
import { SweetAlertService } from './../../../../services/sweetalert/sweet-alert.service';
import { ModalService } from './../../../../components/modal/modal.service';
import { RegionalService } from './../../../../services/regional/regional.service';
import { City } from './../../../../models/city';
import { Subscription } from 'rxjs/Subscription';
import { Unity } from './../../../../models/unity';
import { Regional } from './../../../../models/regional';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-uc-details',
  templateUrl: './uc-details.component.html',
  styleUrls: ['./uc-details.component.css']
})
export class UcDetailsComponent extends PagenateComponent implements OnInit {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  @Input() regional: Regional;
  @Input() unity: Unity = new Unity();
  @Output() eventSave = new EventEmitter<boolean>();
  private subscription: Subscription;
  private isNewData: boolean;
  @Input() isNewUC: boolean;
  private isNewCity: boolean;
  private urlId: string;
  private sectionInfoTab: string;
  private sectionUCTab: string;
  private data3Tab: string;
  private currentTab: number;
  private previousTab: string;
  private nextTab: string;
  private next: string;
  private enable_save: boolean;
  private enable_previous: boolean;
  private cont: number;
  private cities: City[] = new Array();
  private cityId: any;
  private changedCityId: any;

  private isFormValid: boolean;
  private isCkeckboxValid: boolean;
  private tab: string;
  private _isSave: boolean;
  private openSaveButtonTab1: HTMLButtonElement;
  private openSaveButtonTab2: HTMLButtonElement;
  private openSaveButtonTab3: HTMLButtonElement;

  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private onChange: boolean;

  private type: any;

  private index1: any;
  private index2: any;
  private index: number;
  private show: boolean;
  private isShowUC: boolean;
  @Output() private cancel = new EventEmitter<boolean>();

  constructor(
    private regionalService: RegionalService,
    private modalService: ModalService,
    private sweetAlertService: SweetAlertService,
    private sweetAlert2Service: SweetAlert2Service,
    private permissions: Permissions,
    private loaderService: LoaderService,
    private route: Router,
    private servicePage: PageService,
  ) {
    super(servicePage);
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
      this.index = 1;
   }

  ngOnInit() {
    this.permissions.canActivate(['/regional/registro']);
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
    this.urlId = localStorage.getItem('regionalId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      this.load();
    } else {
      this.loaderService.hide();
    }

    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';

    this.sectionInfoTab = './assets/img/regional/ic_dataTab2_enable.png';
    this.sectionUCTab = './assets/img/regional/ic_dataTab2_disable.png';

    this.isCkeckboxValid = true;

    this.getCities();
  }

  changeCity(event) {
    console.log(event);
  }


  load() {
    this.loaderService.show();
    this.regionalService.load(this.urlId).subscribe(
      success => {
        this.regional = success;
        if (this.isNewUC) {
          this.allItems = new Array();
          this.pagedItems = new Array();
          this.setPage(1);
        } else {
          this.index = 1;
          if (this.unity.cities !== undefined) {
            this.unity.cities.forEach( el => {
              el.number = this.index ++;
            });
            this.allItems = this.unity.cities;
            this.pagedItems = this.unity.cities;
            this.setPage(1);
          }
        }
        this.loaderService.hide();
        if (this.regional === undefined) {
          this.regional = new Regional();
        }
      },
      error => {
        this.loaderService.hide();
        console.log(error);
      }
    );
  }

  openModal() {
    this.modalService.modalCancel('/regionais');

  }
  toBack() {
    this.cancel.emit(true);
  }

  onCancel() {
    this.cancel.emit(true);
    // this.btn_cancel = true;
  }

  onCancelAddCity() {
    // this.load();
   }

  //  getCities() {
  //       this.regionalService.getCities().subscribe(
  //         s => {
  //           this.cities = s;
  //           console.log(this.cities);
  //         },
  //         error => console.log(error)
  //       );
  // }
  getCities() {
    this.regionalService.getState().subscribe(
      state => {
        this.regionalService.getCities(state[0].id).subscribe(
          states => {
            this.cities = states.cities;
          },
          error => console.log(error)
        );
      }
    );
  }

  save(tab: string, isValid: boolean) {
    this.isFormValid = isValid;
    this.tab = tab;
    this._isSave = false;
  }

  createNewUC() {
    this.show = false;
    this.isShowUC = true;
    this.isNewUC = true;
    this.unity = new Unity();
  }

  addCity() {
    this.isNewCity = true;
  }

  onEdit(item) {
    this.show = false;
    this.isNewUC = false;
    this.changedCityId = item.id;
    this.cityId = item.id;
    this.isNewCity = false;
  }

  loadUnities() {
    // this.regionalService.getQuestions();
  }

  showQuestion(item) {
    this.show = true;
    this.unity = item;
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
          this.isFormValid = true;
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
          }
      }else {
        if (this.currentTab > 0) {
              this.currentTab--;
              this.cont--;
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
          this.sectionInfoTab = './assets/img/regional/ic_dataTab2_enable.png';
          this.sectionUCTab = './assets/img/regional/ic_dataTab2_disable.png';

        }else if (this.currentTab === 1) {
          this.sectionInfoTab = './assets/img/regional/ic_dataTab2_disable.png';
          this.sectionUCTab = './assets/img/regional/ic_dataTab2_enable.png';
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = '';
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = '';
        }
      } else {
        if (t === 1) {
          this.nextTab = '#tab_1';
        }
      }

  }

  walk ( tab: number) {
    switch (tab) {
      case 0:
      this.sectionInfoTab = './assets/img/regional/ic_dataTab2_enable.png';
      this.sectionUCTab = './assets/img/regional/ic_dataTab2_disable.png';
      break;
      case 1:
      this.sectionInfoTab = './assets/img/regional/ic_dataTab2_disable.png';
      this.sectionUCTab = './assets/img/regional/ic_dataTab2_enable.png';
      break;
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
