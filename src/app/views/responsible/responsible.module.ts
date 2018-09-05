import { NgxMaskModule } from 'ngx-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { ResponsibleDetailsComponent } from './responsible-details/responsible-details.component';
import { ResponsibleListComponent } from './responsible-list/responsible-list.component';
import { ResponsibleComponent } from './responsible.component';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsibleRoutingModule } from './responsible-routing.module';
import { PregnanciesComponent } from './responsible-details/pregnancies/pregnancies.component';

@NgModule({
  imports: [
    CommonModule,
    ResponsibleRoutingModule,
    HttpModule,
    FormsModule,
    MyDatePickerModule,
    NgxMaskModule,
    SharedModule
  ],
  declarations: [
    ResponsibleComponent,
    ResponsibleListComponent,
    ResponsibleDetailsComponent
  ],
  exports: [
    ResponsibleComponent,
    ResponsibleListComponent,
    ResponsibleDetailsComponent
  ]
})
export class ResponsibleModule { }
