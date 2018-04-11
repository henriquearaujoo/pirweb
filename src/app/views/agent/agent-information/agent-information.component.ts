import { Profile } from './../../../models/profile';
import { Component, OnInit } from '@angular/core';
import { Permissions, RuleState } from '../../../helpers/permissions';

@Component({
  selector: 'app-agent-information',
  templateUrl: './agent-information.component.html',
  styleUrls: ['./agent-information.component.css']
})
export class AgentInformationComponent implements OnInit {

  private rules: any;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private profile: Profile = new Profile();
  private isAgent: boolean;

  constructor(private permissions: Permissions) {
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
  }

  ngOnInit() {
    this.permissions.canActivate('/agent-information');
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.profile = rules.profile;
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
        if (this.profile.type === 'AGENT') {
          this.isAgent = true;
          localStorage.setItem('userId', localStorage.getItem('currentIdPir'));
        }
      }
    );
  }
}
