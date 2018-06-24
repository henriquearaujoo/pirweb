import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-builder-list-item',
  templateUrl: './form-builder-list-item.component.html',
  styleUrls: ['./form-builder-list-item.component.css',
  '../../../../../../node_modules/materialize-css/dist/css/materialize.min.css']
})
export class FormBuilderListItemComponent implements OnInit {

  @Input() form;
  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  editForm() {
     localStorage.setItem('formBuilderId', this.form.id );
    this.router.navigate(['/formularios/construtor/registro']);
  }
}
