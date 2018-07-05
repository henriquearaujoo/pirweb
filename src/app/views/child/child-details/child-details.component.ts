import { Visit } from './../../../models/visit';
import { Router } from '@angular/router';
import { Responsible } from './../../../models/responsible';
import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { ResponsibleService } from './../../../services/responsible/responsible.service';
import { Child } from './../../../models/child';
import { ChildService } from './../../../services/child/child.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.css']
})
export class ChildDetailsComponent implements OnInit {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private child: Child = new Child();
  private urlId: string;
  private who_take_care: any[];

  private infoTab: string;
  private socialTab: string;
  private responsiblesTab: string;
  private visitsTab: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private routeResp: boolean;
  private hasdata: boolean;
  private routeChildResponsible: boolean;
  private visit: Visit = new Visit();

  constructor(
    private childService: ChildService,
    private responsibleService: ResponsibleService,
    private loaderService: LoaderService,
    private permissions: Permissions,
    private router: Router
  ) {
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
  }

  ngOnInit() {
    this.permissions.canActivate(['/criancas/detalhes']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    /*check if is a new or update*/
    this.urlId = localStorage.getItem('childId');
    if (this.urlId !== null && this.urlId !== '') {
      this.load();
    }

    if (localStorage.getItem('route') === 'rr') {
      this.routeResp = true;
    }

    if (localStorage.getItem('route') === 'rcr') {
      this.routeChildResponsible = true;
      this.walk(2);
    } else {
      this.walk(0);
    }
  }

  load() {
    this.loaderService.show();
    this.childService.load(this.urlId).subscribe(
      success => {
        this.child = success;
        this.hasdata = true;
        this.who_take_care = this.child.who_take_care.split(',');
        this.loaderService.hide();
        console.log(this.child);
        if (this.child === undefined) {
          this.child = new Child();
        }
      },
      error => {
        this.loaderService.hide();
        this.hasdata = false;
        console.log(error);
      }
    );
  }

  toBack() {
    if (this.routeResp) {
      localStorage.setItem('route', 'rc');
    }
  }

  toViewResponsible(responsible: Responsible) {
    localStorage.setItem('route', 'rr');
    localStorage.setItem('responsibleId', responsible.id);
    this.router.navigate(['/responsaveis/detalhes']);
  }

  setVisit(visit) {
    this.visit = visit;
  }

  walk ( tab: number) {
    switch (tab) {
      case 0:
      this.infoTab = './assets/img/child/ic_section_info_enable.png';
      this.socialTab = './assets/img/child/ic_section_info_social_disable.png';
      this.responsiblesTab = './assets/img/pregnant/ic_data_disable.png';
      this.visitsTab = './assets/img/pregnant/ic_data_disable.png';
      break;
      case 1:
      this.infoTab = './assets/img/child/ic_section_info_disable.png';
      this.socialTab = './assets/img/child/ic_section_info_social_enable.png';
      this.responsiblesTab = './assets/img/pregnant/ic_data_disable.png';
      this.visitsTab = './assets/img/pregnant/ic_data_disable.png';
      break;
      case 2:
      this.infoTab = './assets/img/child/ic_section_info_disable.png';
      this.socialTab = './assets/img/child/ic_section_info_social_disable.png';
      this.responsiblesTab = './assets/img/pregnant/ic_data_enable.png';
      this.visitsTab = './assets/img/pregnant/ic_data_disable.png';
      break;
      case 3:
      this.infoTab = './assets/img/child/ic_section_info_disable.png';
      this.socialTab = './assets/img/child/ic_section_info_social_disable.png';
      this.responsiblesTab = './assets/img/pregnant/ic_data_disable.png';
      this.visitsTab = './assets/img/pregnant/ic_data_enable.png';
      break;
    }
  }

}
