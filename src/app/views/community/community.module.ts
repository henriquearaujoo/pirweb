import { SharedModule } from './../../shared/shared.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommunityDetailsComponent } from './community-details/community-details.component';
import { CommunityListComponent } from './community-list/community-list.component';
import { CommunityComponent } from './community.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommunityRoutingModule,
    HttpModule,
    FormsModule,
    SharedModule,
    MyDatePickerModule
  ],
  declarations: [
    CommunityComponent,
    CommunityListComponent,
    CommunityDetailsComponent
  ],
  exports: [
    CommunityComponent,
    CommunityListComponent,
    CommunityDetailsComponent
  ]
})
export class CommunityModule { }
