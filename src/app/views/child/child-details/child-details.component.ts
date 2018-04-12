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

  private data1Tab: string;
  private data2Tab: string;
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
    this.permissions.canActivate(['/child-details']);
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

    this.data1Tab = './assets/img/child/ic_data_enable.png';
    this.data2Tab = './assets/img/child/ic_data_disable.png';
  }

  load() {
    this.childService.load(this.urlId).subscribe(
      success => {
        this.child = success;
        this.who_take_care = this.child.who_take_care.split('|');
        this.child.who_take_care = this.child.who_take_care.replace('|', ' / ');
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
        this.data1Tab = './assets/img/child/ic_data_enable.png';
        this.data2Tab = './assets/img/child/ic_data_disable.png';
      break;
      case 1:
        this.data1Tab = './assets/img/child/ic_data_disable.png';
        this.data2Tab = './assets/img/child/ic_data_enable.png';
      break;
    }
  }

}
