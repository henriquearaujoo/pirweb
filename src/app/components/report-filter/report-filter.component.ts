import { VariableType } from './../../enums/variable_type';
import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.css']
})
export class ReportFilterComponent implements OnInit {

  @Input() currentFilter: any;
  @Input() filterList: any;
  private type = new VariableType();
  private t_var: number;
  public formFilter: FormGroup;

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formFilter = this.formBuilder.group({
      param1: '',
      condition: '',
      param2: '',
      items: this.formBuilder.array([ this.createFilterItem()])
    });
    this.createFilterItem();
    const type = this.type.getValue(this.currentFilter.prop.type);
    this.t_var = type;
  }

  public invoke() {
    this.formFilter = this.formBuilder.group({
      param1: '',
      condition: '',
      param2: '',
      items: this.formBuilder.array([ this.createFilterItem()])
    });
    this.createFilterItem();
    const type = this.type.getValue(this.currentFilter.prop.type);
    this.t_var = type;
  }

  change(event, id, type) {
    const idx = id;
    this.filterList.forEach(node => {
      if (node.entity === this.currentFilter.entity) {
        if (node.prop.property === this.currentFilter.prop.property) {
          switch (type) {
            case 1: // value
              if (idx === node.filters.length) {
                node.filters.push({
                  arg: event.target.value,
                  condition: undefined
                });
              }else {
                node.filters[idx].arg = event.target.value;
              }
            break;
            default: // condition
              if (idx === node.filters.length) {
                node.filters.push({
                  arg: undefined,
                  condition: event.target.value
                });
              }else {
                node.filters[idx].condition = event.target.value;
              }
            break;
          }
        }
      }
    });
  }

  createFilterItem(): FormGroup {
    return this.formBuilder.group({
      description: '',
      responsible: '',
      date: ''
    });
  }

  get filterItems(): FormArray {
    return this.formFilter.get('items') as FormArray;
  }
  private addItem(): void {

    this.filterItems.push(this.createFilterItem());
    // const i = new DThree();
    // this.dthree.push(i);
  }
  private removeItem(item, index) {
    this.filterItems.removeAt(index);
    // this.dthree.splice(index, 1);
  }

  private addCondition(event, item, index) {
    if (event.target.value !== '--') {
      this.addItem();
    }
  }

  private OnSubmit(formValue: any) {  }
}
