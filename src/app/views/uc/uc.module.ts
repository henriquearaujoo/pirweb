import { UcComponent } from './uc.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UcRoutingModule } from './uc-routing.module';
import { UcDetailsComponent } from './uc-details/uc-details.component';
import { UcListComponent } from './uc-list/uc-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UcRoutingModule
  ],
  declarations: [UcComponent, UcDetailsComponent, UcListComponent]
})
export class UcModule { }
