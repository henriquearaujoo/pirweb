import { Visit } from './../../../../models/visit';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregnancies',
  templateUrl: './pregnancies.component.html',
  styleUrls: ['./pregnancies.component.css']
})
export class PregnanciesComponent implements OnInit {
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private visit: Visit = new Visit();
  @Input() pregnancy;
  @Output() showPregnancy = new EventEmitter<boolean>();
  constructor(private router: Router) { }

  ngOnInit() {
  }

  toBack() {
    this.showPregnancy.emit(false);
  }

  setVisit(visit) {
    this.visit = visit;
  }

}
