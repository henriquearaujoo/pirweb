import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user';
import { Permissions, RuleState } from '../../../helpers/permissions';

@Component({
  selector: 'app-agent-map',
  templateUrl: './agent-map.component.html',
  styleUrls: ['./agent-map.component.css']
})
export class AgentMapComponent implements OnInit {
  private agents: User[] = new Array();
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  markers: Marker[] = [
    {
      lat: -7.50427875,
      lng: -63.0360884,
      label: 'Humaitá',
      draggable: true
    },
    {
      lat: -2.63776067,
      lng: -56.72981509,
      label: 'Parintins',
      draggable: false
    }
  ];
  constructor(
    private userService: UserService,
    private permissions: Permissions) {
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
     }

  ngOnInit() {
    this.permissions.canActivate(['/agents-map']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
  }

  getAgents() {
    this.userService.getAgents().subscribe(
      agents => {
        this.agents = agents;
      },
      error => console.log(error)
    );
  }

}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
