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

  private child: Child = new Child();
  private urlId: string;
  private who_take_care: any[];

  private infoTab: string;
  private socialTab: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
    private childService: ChildService,
    private responsibleService: ResponsibleService,
    private permissions: Permissions
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

    this.infoTab = './assets/img/child/ic_section_info_enable.png';
    this.socialTab = './assets/img/child/ic_section_info_social_disable.png';
  }

  load() {
    this.childService.load(this.urlId).subscribe(
      success => {
        this.child = success;
        this.who_take_care = this.child.who_take_care.split(',');
        // this.child.who_take_care = this.child.who_take_care.replace(',', ' / ');
        if (this.child === undefined) {
          this.child = new Child();
        }
      },
      error => console.log(error)
    );
  }

  walk ( tab: number) {
    switch (tab) {
      case 0:
      this.infoTab = './assets/img/child/ic_section_info_enable.png';
      this.socialTab = './assets/img/child/ic_section_info_social_disable.png';
      break;
      case 1:
      this.infoTab = './assets/img/child/ic_section_info_disable.png';
      this.socialTab = './assets/img/child/ic_section_info_social_enable.png';
      break;
    }
  }

}
