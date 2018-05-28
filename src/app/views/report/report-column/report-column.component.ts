import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-column',
  templateUrl: './report-column.component.html',
  styleUrls: ['./report-column.component.css']
})
export class ReportColumnComponent implements OnInit {

  @Input() property;
  @Output() apply = new EventEmitter();
  private selected = true;

  constructor() { }

  ngOnInit() {
  }
  select() {
    this.selected = !this.selected;
    this.apply.emit(this.selected);
  }
}
