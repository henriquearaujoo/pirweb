// import { Component, OnInit } from '@angular/core';
import { Component, NgModule, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { User } from '../../models/user';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})
export class MapsComponent implements OnInit {
  title = '';
  lat: number = -3.120896 ;
  lng: number =  -60.013124;
  @Input() markers;
  @Input() agents: User[];

  constructor() { }

  ngOnInit() { }
  // tslint:disable-next-line:member-ordering
  zoom = 6;
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    //  this.markers.push({
    //    lat: $event.coords.lat,
    //    lng: $event.coords.lng,
    //    true
    //  });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}
// tslint:disable-next-line:class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
