import { City } from './../../models/city';
import { Unity } from './../../models/unity';
import { PageService } from './../../services/pagenate/page.service';
import { PagenateComponent } from './../../components/pagenate/pagenate.component';
import { RegionalService } from './../../services/regional/regional.service';
import { Regional } from './../../models/regional';
import { ToastService } from './../../services/toast-notification/toast.service';
import { LoaderService } from './../../services/loader/loader.service';
import { Permissions, RuleState } from './../../helpers/permissions';
import { SweetAlert2Service } from './../../services/sweetalert/sweet-alert.2service';
import { SweetAlertService } from './../../services/sweetalert/sweet-alert.service';
import { ModalService } from './../../components/modal/modal.service';
import { CommunityService } from './../../services/community/community.service';
import { IMyDpOptions } from 'mydatepicker';
import { Subscription } from 'rxjs/Subscription';
import { Community } from './../../models/community';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.css']
})
export class RegionalComponent extends PagenateComponent implements OnInit {

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
    this.permissions.canActivate(['/regionais/registro']);
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

    this.sectionInfoTab = './assets/img/regional/ic_section_info_enable.png';

    this.getCities();
  }

  saveData(isValid) {
    if (isValid) {
      if (this.isNewData || this.regional.id === undefined) {
        if ( this.canCreate) {
          this.regionalService.insert(this.regional).subscribe(
            success => {
              this.regional = success;
              localStorage.setItem('regionalId', this.regional.id);
              this.isNewData  = false;
              this.sweetAlertService.alertSuccess('/regionais/registro');
            },
            error => {
              if ( error === 'regional.name.violation') {
                this.toastService.toastMsgWarn('Atenção', 'Regional já cadastrada!');
              } else {
                this.toastService.toastError();
                console.log('save error:', error);
              }
            }
          );
        } else {
          this.sweetAlertService.alertPermission('/regionais');
        }
      } else {
        if ( this.canUpdate) {
          this.regionalService.update(this.regional).subscribe(
            success => {
              this.regional = success;
              this.sweetAlertService.alertSuccessUpdate('/regionais');
            },
            error => {
              if ( error === 'regional.name.violation') {
                this.toastService.toastMsgWarn('Atenção', 'Regional já cadastrada!');
              } else {
                this.toastService.toastError();
                console.log('save error:', error);
              }
            }
          );
        } else {
          this.sweetAlertService.alertPermission('/regionais');
        }
      }
    }  else {
      if (!isValid) {
        this.toastService.toastMsgError('Erro', 'Preencha todos os campos obrigatórios do formulário!');
      }
    }
  }

  load() {
    this.loaderService.show();
    this.urlId = localStorage.getItem('regionalId');
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
          this.saveData(true);
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
    this.load();
  }

  setUnity(item) {
    this.unity = item;
  }

  loadUnities() {
    // this.regionalService.getQuestions();
  }

  showUC(item) {
    this.show = true;
    this.unity = item;
  }

  isSave() {
    this._isSave = true;
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
