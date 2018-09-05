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
  markers: Marker[] = new Array();
  constructor(
    private userService: UserService,
    private permissions: Permissions) {
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
     }

  ngOnInit() {
    this.permissions.canActivate(['/agentes-mapa']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );

    this.getAgents();
  }

  getAgents() {
    this.userService.getAgents().subscribe(
      agents => {
        this.agents = agents.content;
        console.log(this.agents);
        for (let i = 0; i < this.agents.length; i++) {
          const mk = {
            lat: this.agents[i].person.agent.latitude,
            lng: this.agents[i].person.agent.longitude,
            label: '',
            draggable: false
          };
         this.markers.push(mk);
        }
        console.log(this.markers);
      },
      error => console.log(error)
    );
  }

}

export class Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
