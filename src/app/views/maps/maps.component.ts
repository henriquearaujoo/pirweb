//import { Component, OnInit } from '@angular/core';
import {
  Component,
  NgModule,
  OnInit
} from '@angular/core';

import {
  BrowserModule
} from '@angular/platform-browser';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  
})
export class MapsComponent implements OnInit {
  title: string = '';
  lat: number = -3.120896 ;
  lng: number =  -60.013124;
  constructor() { }

  ngOnInit() { }
  
  zoom: number = 6;
  
  // initial center position for the map
  markers: marker[] = [
	  // {
		//   lat: 51.673858,
		//   lng: 7.815982,
		//   label: 'A',
		//   draggable: true
	  // },
	  // {
		//   lat: 51.373858,
		//   lng: 7.215982,
		//   label: 'B',
		//   draggable: false
	  // }
  ]
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
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
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}