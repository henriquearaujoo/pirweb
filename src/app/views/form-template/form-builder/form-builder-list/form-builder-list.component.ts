import { Component, OnInit } from '@angular/core';
import { FormBuilderService } from '../../../../services/form/formBuilder.service';
import { FormBuilderM } from '../../../../models/formBuilder-m';

@Component({
  selector: 'app-form-builder-list',
  templateUrl: './form-builder-list.component.html',
  styleUrls: ['./form-builder-list.component.css']
})
export class FormBuilderListComponent implements OnInit {

private forms: FormBuilderM;
  constructor(
    private formService:FormBuilderService
  ) { }

  ngOnInit() {
    this.getForms();
  }

  newForm() {
  }

  getForms() {
    this.formService.getForms().subscribe(
      s => {
        this.forms = s;
        console.log(s);
      },
      error => console.log(error)
    );
  }

}
