import { Permissions, RuleState } from './../../../helpers/permissions';
import { CommunityService } from './../../../services/community/community.service';
import { ResponsibleService } from './../../../services/responsible/responsible.service';
import { Responsible } from './../../../models/responsible';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responsible-details',
  templateUrl: './responsible-details.component.html',
  styleUrls: ['./responsible-details.component.css']
})
export class ResponsibleDetailsComponent implements OnInit {

  private responsible: Responsible = new Responsible();
  private infoTab: string;
  private dataTab: string;
  private servicesTab: string;
  private urlId: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
    private responsibleService: ResponsibleService,
    private communityService: CommunityService,
    private permissions: Permissions
  ) {
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

     this.infoTab = './assets/img/pregnant/ic_section_info_enable.png';
     this.dataTab = './assets/img/pregnant/ic_section_info_data_disable.png';
     this.servicesTab = './assets/img/pregnant/ic_section_info_services_disable.png';

  }

  load() {
    this.responsibleService.load(this.urlId).subscribe(
      success => {
        this.responsible = success;
        if (this.responsible === undefined) {
          this.responsible = new Responsible();
        }
      },
      error => console.log(error)
    );
  }

  walk ( tab: number) {
    switch (tab) {
      case 0:
      this.infoTab = './assets/img/pregnant/ic_section_info_enable.png';
      this.dataTab = './assets/img/pregnant/ic_section_info_data_disable.png';
      this.servicesTab = './assets/img/pregnant/ic_section_info_services_disable.png';
      break;
      case 1:
      this.infoTab = './assets/img/pregnant/ic_section_info_disable.png';
      this.dataTab = './assets/img/pregnant/ic_section_info_data_enable.png';
      this.servicesTab = './assets/img/pregnant/ic_section_info_services_disable.png';
      break;
      case 2:
      this.infoTab = './assets/img/pregnant/ic_section_info_disable.png';
      this.dataTab = './assets/img/pregnant/ic_section_info_data_disable.png';
      this.servicesTab = './assets/img/pregnant/ic_section_info_services_enable.png';
      break;
    }
  }

}
