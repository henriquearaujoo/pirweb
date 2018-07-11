import { RegionalComponent } from './regional.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionalRoutingModule } from './regional-routing.module';
import { RegionalListComponent } from './regional-list/regional-list.component';
import { RegionalDetailsComponent } from './regional-details/regional-details.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RegionalRoutingModule
  ],
  declarations: [RegionalComponent, RegionalListComponent, RegionalDetailsComponent]
})
export class RegionalModule { }
