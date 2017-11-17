import { Reception } from './../../../models/reception';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reception',
   templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})

export class ReceptionComponent implements OnInit {

  reception = new Reception();
  description: any;

  constructor() { }

  ngOnInit() {

  }

}
