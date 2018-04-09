import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-agent-map',
  templateUrl: './agent-map.component.html',
  styleUrls: ['./agent-map.component.css']
})
export class AgentMapComponent implements OnInit {
  private agents: User[] = new Array();
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
    private userService: UserService) { }

  ngOnInit() {
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
