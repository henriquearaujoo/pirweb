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
      description: '',
      responsible: '',
      date: '',
      items: this.formBuilder.array([ this.createFilterItem()])
    });
    this.createFilterItem();
    const type = this.type.getValue(this.currentFilter.prop.type);
    this.t_var = type;
  }

  public invoke() {
    const type = this.type.getValue(this.currentFilter.prop.type);
    this.t_var = type;
    console.log(type, '===', this.currentFilter.prop.type);
  }

  change(event, index, type) {
    // if ( this.dthree.length === 0 ) {
    //   const i = new DThree();
    //   this.dthree.push(i);
    // }
    // if (type === 0) {
    //   this.dthree[index].responsible = this.members[event.target.value];
    // } else if (type === 1) {
    //   console.log(event.target.valueAsDate);
    //   this.dthree[index].registeredAt = event.target.valueAsDate;
    // } else {
    //   this.dthree[index].description = event.target.value;
    // }
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
