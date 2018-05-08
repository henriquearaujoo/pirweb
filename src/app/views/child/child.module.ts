import { SharedModule } from './../../shared/shared.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChildDetailsComponent } from './child-details/child-details.component';
import { ChildListComponent } from './child-list/child-list.component';
import { ChildComponent } from './child.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildRoutingModule } from './child-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ChildRoutingModule,
    HttpModule,
    FormsModule,
    MyDatePickerModule,
    SharedModule
  ],
  declarations: [
    ChildComponent,
    ChildListComponent,
    ChildDetailsComponent,
  ],
  exports: [
    ChildComponent,
    ChildListComponent,
    ChildDetailsComponent,
  ]
})
export class ChildModule { }
