import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-control-field-error',
  templateUrl: './control-field-error.component.html',
  styleUrls: ['./control-field-error.component.css']
})
export class ControlFieldErrorComponent implements OnInit {

  @Input() showError: boolean;
  @Input() msgError: boolean;

  constructor() { }

  ngOnInit() {
  }

}
