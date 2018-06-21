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
import { FormBuilderComponent } from './form-builder/form-builder.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatSelectModule } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { FormQuestionsComponent } from './form-builder/form-questions/form-questions.component';
import { FormAlternativeComponent } from './form-builder/form-questions/form-alternative/form-alternative.component';


@NgModule({
  imports: [
    CommonModule,
    FormTemplateRoutingModule,
    HttpModule,
    FormsModule,
    MyDatePickerModule,
    NgxMaskModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormTemplateListComponent,
    FormTemplateComponent,
    FormTemplateDetailsComponent,
    FormBuilderComponent,
    FormQuestionsComponent,
    FormAlternativeComponent
  ],
  exports: [
    FormTemplateListComponent,
    FormTemplateComponent,
    FormTemplateDetailsComponent
  ]
})
export class FormTemplateModule { }
