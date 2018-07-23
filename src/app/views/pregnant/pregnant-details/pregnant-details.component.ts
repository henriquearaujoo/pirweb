import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { CommunityService } from './../../../services/community/community.service';
import { Pregnant } from './../../../models/pregnant';
import { Responsible } from './../../../models/responsible';
import { ResponsibleService } from './../../../services/responsible/responsible.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pregnant-details',
  templateUrl: './pregnant-details.component.html',
  styleUrls: ['./pregnant-details.component.css']
})
export class PregnantDetailsComponent implements OnInit {

  private responsible: Responsible = new Responsible();
  private data1Tab: string;
  private data2Tab: string;
  private data3Tab: string;
  private urlId: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
    private responsibleService: ResponsibleService,
    private communityService: CommunityService,
    private loaderService: LoaderService,
    private permissions: Permissions
  ) {
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
   }

  ngOnInit() {
    this.permissions.canActivate(['/pregnant-list/details']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.urlId = localStorage.getItem('motherId');
    if (this.urlId !== null && this.urlId !== '') {
      this.load();
    }
    this.data1Tab = './assets/img/pregnant/ic_data_enable.png';
    this.data2Tab = './assets/img/pregnant/ic_data_disable.png';
    this.data3Tab = './assets/img/pregnant/ic_data_disable.png';
  }

  load() {
    this.loaderService.show();
    this.responsibleService.load(this.urlId).subscribe(
      success => {
        this.responsible = success;
        this.loaderService.hide();
        // if (this.responsible.mother === undefined) {
        //   this.responsible.mother = new Pregnant();
        // }
      },
      error => {
        this.loaderService.hide();
        console.log(error);
      }
    );
  }

  walk ( tab: number) {
    switch (tab) {
      case 0:
        this.data1Tab = './assets/img/pregnant/ic_data_enable.png';
        this.data2Tab = './assets/img/pregnant/ic_data_disable.png';
        this.data3Tab = './assets/img/pregnant/ic_data_disable.png';
      break;
      case 1:
      this.data1Tab = './assets/img/pregnant/ic_data_disable.png';
      this.data2Tab = './assets/img/pregnant/ic_data_enable.png';
      this.data3Tab = './assets/img/pregnant/ic_data_disable.png';
      break;
      case 2:
      this.data1Tab = './assets/img/pregnant/ic_data_disable.png';
      this.data2Tab = './assets/img/pregnant/ic_data_disable.png';
      this.data3Tab = './assets/img/pregnant/ic_data_enable.png';
      break;
    }
  }

}
