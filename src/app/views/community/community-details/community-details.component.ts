import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../../services/community/community.service';
import { Community } from '../../../models/community';

@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.css']
})
export class CommunityDetailsComponent implements OnInit {

  private sectionInfoTab: string;
  private sectionServicesTab: string;
  private urlId: string;
  private community: Community = new Community();
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
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
    this.permissions.canActivate(['/comunidades/detalhes']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.urlId = localStorage.getItem('communityId');
    if (this.urlId !== null && this.urlId !== '') {
      this.load();
    }
    this.sectionInfoTab = './assets/img/community/ic_section_info_enable.png';
    this.sectionServicesTab = './assets/img/community/ic_section_services_disable.png';
  }

  load() {
    this.loaderService.show();
    this.communityService.load(this.urlId).subscribe(
      success => {
        this.community = success;
        this.community.regional = this.community.unity.regional;
        this.loaderService.hide();
        if (this.community === undefined) {
          this.community = new Community();
        }
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
        this.sectionInfoTab = './assets/img/community/ic_section_info_enable.png';
        this.sectionServicesTab = './assets/img/community/ic_section_services_disable.png';
      break;
      case 1:
        this.sectionInfoTab = './assets/img/community/ic_section_info_disable.png';
        this.sectionServicesTab = './assets/img/community/ic_section_services_enable.png';
      break;
    }
  }

}
