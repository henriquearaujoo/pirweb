import { Router } from '@angular/router';
import { SweetAlert2Service } from './../../../services/sweetalert/sweet-alert.2service';
import { SweetAlertService } from './../../../services/sweetalert/sweet-alert.service';
import { Subscription } from 'rxjs/Subscription';
import { PagenateComponent } from './../../../components/pagenate/pagenate.component';
import { PageService } from './../../../services/pagenate/page.service';
import { LoaderService } from './../../../services/loader/loader.service';
import { ModalService } from './../../../components/modal/modal.service';
import { ToastService } from './../../../services/toast-notification/toast.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { RegionalService } from './../../../services/regional/regional.service';
import { Unity } from './../../../models/unity';
import { Regional } from './../../../models/regional';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regional-details',
  templateUrl: './regional-details.component.html',
  styleUrls: ['./regional-details.component.css']
})
export class RegionalDetailsComponent extends PagenateComponent implements OnInit {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private regional: Regional = new Regional();
  private unity: Unity = new Unity();
  private subscription: Subscription;
  private isNewData: boolean;
  public isNewUC: boolean;
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
  private cities: any[] = new Array();

  private isFormValid: boolean;
  private _isSave: boolean;
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

  constructor(
    private regionalService: RegionalService,
    private toastService: ToastService,
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
      this.allItems = [];
      this.pagedItems = [];
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
      this.regional.name = '';
      this.loaderService.hide();
    }

    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';

    this.sectionInfoTab = './assets/img/regional/ic_dataTab2_enable.png';
    this.sectionUCTab = './assets/img/regional/ic_dataTab2_disable.png';

    this.getCities();
  }

  saveData(isValid) {
    if (isValid) {
      if (this.isNewData || this.regional.id === undefined) {
        this.regionalService.insert(this.regional).subscribe(
          success => {
            this.regional = success;
            this.isNewData  = false;
            this.sweetAlertService.alertSuccess('/regionais/registro');
          },
          error => {
            if ( error === 'regional_name.found') {
              this.toastService.toastMsgWarn('Atenção', 'Regional já cadastrada!');
            } else {
              this.toastService.toastError();
              console.log('save error:', error);
            }
          }
        );
      } else {
        // delete this.community.responsible;
        console.log(this.regional);
        this.regionalService.update(this.regional).subscribe(
          success => {
            this.regional = success;
            this.sweetAlertService.alertSuccessUpdate('/regionais');
          },
          error => {
              this.toastService.toastError();
          }
        );
      }
    }  else {
      if (!isValid) {
        this.toastService.toastMsgError('Erro', 'Preencha todos os campos obrigatórios do formulário!');
      }
    }
  }

  saveUC() {
    if ((this.unity.name === null || this.unity.name === undefined ||
        this.unity.name.toString().trim() === '') &&
       (this.unity.cities === null || this.unity.cities === undefined)) {
      this.toastService.toastMsgError('Erro', 'Nome da UC e Município são campos obrigatórios!');
      this.load();
      return false;
    }
    if (this.unity.name === null || this.unity.name === undefined ||
       this.unity.name.toString().trim() === '') {
      this.toastService.toastMsgError('Erro', 'Nome da UC é um campo obrigatório!');
      this.load();
      return false;
    } else if (this.unity.cities === null || this.unity.cities === undefined) {
      this.toastService.toastMsgError('Erro', 'Município é um campo obrigatório!');
      this.load();
      return false;
    }
    if ( this.isNewUC || this.unity.id === undefined ) {
      this.canCreate = true;
      if (this.canCreate) {
        // this.unity.form_id = this.form.id;
      this.regionalService.insertUC (this.unity).subscribe(
        success => {
          this.isNewUC = false;
          this.unity = success;
          this.load();
          this.toastService.toastSuccess();
        },
        error => console.log(error)
      );
      } else {
        this.sweetAlertService.alertPermission('/regionais');
      }
    } else {
      this.canUpdate = true;
      if (this.canUpdate) {
        this.regionalService.updateUC(this.unity).subscribe(
          success => {
            this.load();
            this.toastService.toastSuccess();
          },
          error => console.log(error)
        );
      } else {
        this.sweetAlertService.alertPermission('/regionais');
      }
    }
  }

  load() {
    this.loaderService.show();
    this.regionalService.load(this.urlId).subscribe(
      success => {
        this.regional = success;
        this.index = 1;
        this.regional.unities.forEach( el => {
          el.number = this.index ++;
        });
        this.allItems = this.regional.unities;
        this.pagedItems = this.regional.unities;
        this.setPage(1);
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

  onCancel() {
    if (this.onChange) {
      this.sweetAlert2Service.alertToSave()
      .then((result) => {
        if (result.value) {
          this._isSave = true;
        } else {
          this.route.navigate(['/regionais']);
        }
      });
    } else {
      this.openModal();
    }
  }

  onCancelUC() {
    this.load();
   }

   onCancelAddUC(event) {
    if (event) {
      this.isNewData = true;
      this.isNewUC = false;
      this.isShowUC = false;
    }
  }

  getCities() {
    this.regionalService.getCities().subscribe(
      states => {
        this.cities = states;
      },
      error => console.log(error)
    );
}
  // getCities() {
  //   this.regionalService.getState().subscribe(
  //     state => {
  //       this.regionalService.getCities(state[0].id).subscribe(
  //         states => {
  //           this.cities = states.cities;
  //         },
  //         error => console.log(error)
  //       );
  //     }
  //   );
  // }

  save(tab: string, isValid: boolean) {
    this.isFormValid = isValid;
    this._isSave = false;
  }

  createNewUC() {
    this.show = false;
    this.isShowUC = true;
    this.isNewUC = true;
    this.unity = new Unity();
  }

  onEdit(item: Unity) {
    this.show = false;
    this.isShowUC = true;
    this.isNewUC = false;
    this.unity = item;
  }

  onSaveUnity(event) {
    console.log(event);
    this.load();
  }

  setUnity(item) {
    this.unity = item;
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
      } else {
        if ( t === 2) {
          this.isFormValid = true;
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
