import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.css']
})
export class ReportFilterComponent implements OnInit {

  @Input() currentFilter;

  constructor() { }

  ngOnInit() {
  }

}
