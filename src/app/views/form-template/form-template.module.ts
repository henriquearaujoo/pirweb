import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from './../../shared/shared.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormTemplateListComponent } from './form-template-list/form-template-list.component';
import { FormTemplateComponent } from './form-template.component';
import { FormTemplateDetailsComponent } from './form-template-details/form-template-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormTemplateRoutingModule } from './form-template-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormTemplateRoutingModule,
    HttpModule,
    FormsModule,
    MyDatePickerModule,
    NgxMaskModule,
    SharedModule
  ],
  declarations: [
    FormTemplateListComponent,
    FormTemplateComponent,
    FormTemplateDetailsComponent
  ],
  exports: [
    FormTemplateListComponent,
    FormTemplateComponent,
    FormTemplateDetailsComponent
  ]
})
export class FormTemplateModule { }
