import { FormsModule } from '@angular/forms';
import { RegionalComponent } from './regional.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionalRoutingModule } from './regional-routing.module';
import { RegionalListComponent } from './regional-list/regional-list.component';
import { RegionalDetailsComponent } from './regional-details/regional-details.component';
import { SharedModule } from '../../shared/shared.module';
import { UcComponent } from './uc/uc.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    // UcModule,
    RegionalRoutingModule
  ],
  declarations: [RegionalComponent, RegionalListComponent, RegionalDetailsComponent, UcComponent]
})
export class RegionalModule { }
