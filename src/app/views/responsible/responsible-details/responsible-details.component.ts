import { PageService } from './../../../services/pagenate/page.service';
import { PaginateComponent } from './../../../components/paginate/paginate.component';
import { PregnanciesComponent } from './pregnancies/pregnancies.component';
import { Child } from './../../../models/child';
import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { CommunityService } from './../../../services/community/community.service';
import { ResponsibleService } from './../../../services/responsible/responsible.service';
import { Responsible } from './../../../models/responsible';
import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PagenateComponent } from '../../../components/pagenate/pagenate.component';

@Component({
  selector: 'app-responsible-details',
  templateUrl: './responsible-details.component.html',
  styleUrls: ['./responsible-details.component.css']
})
export class ResponsibleDetailsComponent extends PagenateComponent implements OnInit, OnChanges {

  private responsible: Responsible = new Responsible();
  private infoTab: string;
  private dataTab: string;
  private servicesTab: string;
  private childrenTab: string;
  private pregnanciesTab: string;
  private urlId: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private hasdata: boolean;
  private routeChild: boolean;
  private routeChildResponsible: boolean;
  private showPregnancy: boolean;
  private pregnancy: any;
  private filter = {name: ''};
  @ViewChild('pregnancies') pregnancies: PregnanciesComponent;

  constructor(
    private responsibleService: ResponsibleService,
    private communityService: CommunityService,
    private loaderService: LoaderService,
    private permissions: Permissions,
    private router: Router,
    private servicePage: PageService
  ) {
    super(servicePage);
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
   }

  ngOnInit() {
    this.permissions.canActivate(['/responsaveis/detalhes']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
     /*check if is a new or update*/
     this.urlId = localStorage.getItem('responsibleId');
     if (this.urlId !== null && this.urlId !== '') {
       this.load();
     }

     if (localStorage.getItem('route') === 'rc') {
      this.routeChild = true;
    } else if (localStorage.getItem('route') === 'rr') {
      this.routeChildResponsible = true;
    }

    if (this.routeChild) {
     this.walk(4);
    } else {
      this.walk(0);
    }
  }

  ngOnChanges() {
    this.pregnancies.showPregnancy.subscribe(
      evt => {
        this.showPregnancy = evt;
      }
    );
  }

  load() {
    this.loaderService.show();
    this.responsibleService.load(this.urlId).subscribe(
      success => {
        this.responsible = success;
        this.hasdata = true;
        // this.pagedItems = this.responsible.pregnancies;
        // this.allItems = this.responsible.pregnancies;
        this.setPage(1);
        console.log(this.responsible);
        this.loaderService.hide();
        if (this.responsible === undefined) {
          this.responsible = new Responsible();
        }
      },
      error => {
        this.loaderService.hide();
        this.hasdata = false;
        console.log(error);
      }
    );
  }

  toView(child: Child) {
    localStorage.setItem('route', 'rr');
    localStorage.setItem('childId', child.id.toString());
    this.router.navigate(['/criancas/detalhes']);
  }

  toViewPregnancies(pregnancy) {
    this.pregnancy = pregnancy;
    this.showPregnancy = true;
  }

  toShowPregnancy(event) {
    this.showPregnancy = event;
  }

  toBack() {
    if (this.routeChildResponsible) {
      localStorage.setItem('route', 'rcr');
    }
  }

  walk ( tab: number) {
    switch (tab) {
      case 0:
      this.infoTab = './assets/img/pregnant/ic_section_info_enable.png';
      this.dataTab = './assets/img/pregnant/ic_section_info_data_disable.png';
      this.servicesTab = './assets/img/pregnant/ic_section_info_services_disable.png';
      this.pregnanciesTab = './assets/img/pregnant/ic_section_pregnancies_disable.png';
      this.childrenTab = './assets/img/pregnant/ic_section_children_disable.png';
      break;
      case 1:
      this.infoTab = './assets/img/pregnant/ic_section_info_disable.png';
      this.dataTab = './assets/img/pregnant/ic_section_info_data_enable.png';
      this.servicesTab = './assets/img/pregnant/ic_section_info_services_disable.png';
      this.pregnanciesTab = './assets/img/pregnant/ic_section_pregnancies_disable.png';
      this.childrenTab = './assets/img/pregnant/ic_section_children_disable.png';
      break;
      case 2:
      this.infoTab = './assets/img/pregnant/ic_section_info_disable.png';
      this.dataTab = './assets/img/pregnant/ic_section_info_data_disable.png';
      this.servicesTab = './assets/img/pregnant/ic_section_info_services_enable.png';
      this.pregnanciesTab = './assets/img/pregnant/ic_section_pregnancies_disable.png';
      this.childrenTab = './assets/img/pregnant/ic_section_children_disable.png';
      break;
      case 3:
      this.infoTab = './assets/img/pregnant/ic_section_info_disable.png';
      this.dataTab = './assets/img/pregnant/ic_section_info_data_disable.png';
      this.servicesTab = './assets/img/pregnant/ic_section_info_services_disable.png';
      this.pregnanciesTab = './assets/img/pregnant/ic_section_pregnancies_enable.png';
      this.childrenTab = './assets/img/pregnant/ic_section_children_disable.png';
      break;
      case 4:
      this.infoTab = './assets/img/pregnant/ic_section_info_disable.png';
      this.dataTab = './assets/img/pregnant/ic_section_info_data_disable.png';
      this.servicesTab = './assets/img/pregnant/ic_section_info_services_disable.png';
      this.pregnanciesTab = './assets/img/pregnant/ic_section_pregnancies_disable.png';
      this.childrenTab = './assets/img/pregnant/ic_section_children_enable.png';
      break;
    }
  }

}
