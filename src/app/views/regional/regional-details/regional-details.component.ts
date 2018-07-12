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
  private isNewData: boolean;
  private urlId: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private uc: any = { name: ''};
  private show: boolean;
  private regionalTab: string;
  private ucTab: string;

  constructor(
    private regionalService: RegionalService,
    private permissions: Permissions,
    private toastService: ToastService,
    private modalService: ModalService,
    private loaderService: LoaderService,
    private servicePage: PageService
  ) {
    super(servicePage);
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
   }

  ngOnInit() {
    this.permissions.canActivate(['/formularios/detalhes']);
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
    this.urlId = localStorage.getItem('formId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      this.load();
    }
    this.regionalTab = './assets/img/regional/ic_form_enable.png';
    this.ucTab = './assets/img/regional/ic_questions_disable.png';
  }

  load() {
    this.loaderService.show();
    this.regionalService.load(this.urlId).subscribe(
      success => {
        this.regional = success;
        this.regional.unities = this.regional.unities.sort(function (a, b) {
          return a.name.localeCompare(b.name);
         });
        this.allItems = this.regional.unities;
        this.pagedItems = this.regional.unities;
        this.setPage(1);
        this.loaderService.hide();
      },
      error => console.log(error)
    );
  }

  showRegional(item) {
    this.show = true;
    this.uc = item;
  }

  walk ( tab: number) {
    switch (tab) {
      case 0:
      this.regionalTab = './assets/img/form/ic_form_enable.png';
      this.ucTab = './assets/img/form/ic_questions_disable.png';
      break;
      case 1:
      this.regionalTab = './assets/img/form/ic_form_disable.png';
      this.ucTab = './assets/img/form/ic_questions_enable.png';
      break;
    }
  }

}
