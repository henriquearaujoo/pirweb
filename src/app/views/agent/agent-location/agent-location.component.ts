import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Permissions, RuleState } from '../../../helpers/permissions';

@Component({
  selector: 'app-agent-location',
  templateUrl: './agent-location.component.html',
  styleUrls: ['./agent-location.component.css']
})
export class AgentLocationComponent implements OnInit {

  private urlId: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private agent: User = new User();
  markers: Marker[] = [
    {
      lat: -2.63776067,
      lng: -56.72981509,
      label: '',
      draggable: false
    }
  ];

  constructor(
    private userService: UserService,
    private permissions: Permissions
  ) {
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
   }

  ngOnInit() {
    this.permissions.canActivate(['/agente-dashboard/localizacao']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.urlId = localStorage.getItem('userId');
    if ( this.urlId !== undefined) {
      this.getAgent();
    }
  }

  getAgent() {
    this.userService.load(this.urlId).subscribe(
      agent => {
        this.agent = agent;
        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].lat = this.agent.latitude;
          this.markers[i].lng = this.agent.longitude;
        }
      }
    );

  }

}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
