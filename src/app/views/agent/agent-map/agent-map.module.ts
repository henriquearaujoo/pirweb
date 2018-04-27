import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgentMapComponent } from './agent-map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentMapRoutingModule } from './agent-map-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AgentMapRoutingModule,
    HttpModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    AgentMapComponent
  ],
  exports: [AgentMapComponent]
})
export class AgentMapModule { }
