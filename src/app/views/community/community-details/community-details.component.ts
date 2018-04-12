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

  private data1Tab: string;
  private data2Tab: string;
  private urlId: string;
  private community: Community = new Community();
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
    private communityService: CommunityService,
    private permissions: Permissions
  ) {
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
   }

  ngOnInit() {
    this.permissions.canActivate(['/community-details']);
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
    this.data1Tab = './assets/img/community/ic_dataTab1_enable.png';
    this.data2Tab = './assets/img/community/ic_dataTab2_disable.png';
  }

  load() {
    this.communityService.load(this.urlId).subscribe(
      success => {
        this.community = success;
        this.community.water_supply = this.community.water_supply.replace('|', ' / ');
        this.community.cultural_production = this.community.cultural_production.replace('|', ' / ');
        if (this.community === undefined) {
          this.community = new Community();
        }
      },
      error => console.log(error)
    );
  }

  walk ( tab: number) {
    switch (tab) {
      case 0:
        this.data1Tab = './assets/img/community/ic_dataTab1_enable.png';
        this.data2Tab = './assets/img/community/ic_dataTab2_disable.png';
      break;
      case 1:
        this.data1Tab = './assets/img/community/ic_dataTab1_disable.png';
        this.data2Tab = './assets/img/community/ic_dataTab2_enable.png';
      break;
    }
  }

}
