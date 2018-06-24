import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-alternative',
  templateUrl: './form-alternative.component.html',
  styleUrls: ['./form-alternative.component.css']
})
export class FormAlternativeComponent implements OnInit {

    // tslint:disable-next-line:no-input-rename
    @Input('group')
    alternativeForm: FormGroup;
    @Input() type;
    @Input() formBuilder;
  constructor() { }

  ngOnInit() {
  }

}
