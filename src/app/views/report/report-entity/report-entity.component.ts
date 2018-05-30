import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { applyCssTransform } from '@angular/material';

declare const $: any;

@Component({
  selector: 'app-report-entity',
  templateUrl: './report-entity.component.html',
  styleUrls: ['./report-entity.component.css']
})
export class ReportEntityComponent implements OnInit {

  @Input() entity: any;
  @Output() apply = new EventEmitter();
  @Input() rootNode = true;
  private selected = false;

  constructor() { }

  ngOnInit() {

  }

  select() {
    this.selected = !this.selected;
    this.apply.emit(this.selected);
  }

}
