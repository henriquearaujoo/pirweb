import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-agent-location',
  templateUrl: './agent-location.component.html',
  styleUrls: ['./agent-location.component.css']
})
export class AgentLocationComponent implements OnInit {

  private urlId: string;
  private agents: User[] = new Array();
  markers: Marker[] = [
    // {
    //   lat: -7.50427875,
    //   lng: -63.0360884,
    //   label: 'Humaitá',
    //   draggable: true
    // },
    {
      lat: -2.63776067,
      lng: -56.72981509,
      label: 'Parintins',
      draggable: false
    }
  ];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.urlId = localStorage.getItem('userId');
    if ( this.urlId !== undefined) {
      this.getAgent();
    }
  }

  getAgent() {
    this.userService.load(this.urlId).subscribe(
      agent => {
        this.agents = agent;
        console.log(this.agents);
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
