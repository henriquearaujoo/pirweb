import { PregnanciesComponent } from './../responsible/responsible-details/pregnancies/pregnancies.component';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from './../../shared/shared.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PregnantDetailsComponent } from './pregnant-details/pregnant-details.component';
import { PregnantComponent } from './pregnant.component';
import { PregnantListComponent } from './pregnant-list/pregnant-list.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PregnantRoutingModule } from './pregnant-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PregnantRoutingModule,
    HttpModule,
    FormsModule,
    MyDatePickerModule,
    NgxMaskModule,
    SharedModule
  ],
  declarations: [
    PregnantListComponent,
    PregnantComponent,
    PregnantDetailsComponent,
    PregnanciesComponent
  ],
  exports: [
    PregnantListComponent,
    PregnantComponent,
    PregnantDetailsComponent
  ]
})
export class PregnantModule { }
