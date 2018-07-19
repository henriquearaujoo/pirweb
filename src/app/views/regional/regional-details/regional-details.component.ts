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
    this.permissions.canActivate(['/regionais/datalhes']);
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
    this.route.navigate(['/regionais']);
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

  setUnity(item) {
    this.unity = item;
  }

  showUC(item) {
    this.show = true;
    this.unity = item;
  }

  loadUnities() {
    // this.regionalService.getQuestions();
  }

  showQuestion(item) {
    this.show = true;
    this.unity = item;
  }
}
