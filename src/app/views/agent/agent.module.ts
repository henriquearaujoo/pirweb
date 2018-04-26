import { UserService } from './../../services/user/user.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgentInformationComponent } from './agent-information/agent-information.component';
import { PerformanceChartComponent } from './performance-chart/performance-chart.component';
import { VisitHistoricListComponent } from './visit-historic/visit-historic-list/visit-historic-list.component';
import { FamilyListComponent } from './visit-historic/family-list/family-list.component';
import { VisitHistoricComponent } from './visit-historic/visit-historic.component';
import { AgentMapComponent } from './agent-map/agent-map.component';
import { AgentLocationComponent } from './agent-location/agent-location.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { AgentComponent } from './agent.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './../user/user.module';
import { SharedModule } from './../../shared/shared.module';

import { AgentRoutingModule } from './agent-routing.module';
import { SharedUserModule } from '../../shared/shared-user.module';

@NgModule({
  imports: [
    AgentRoutingModule,
    HttpModule,
    FormsModule,
    CommonModule,
    SharedModule,
    SharedUserModule
  ],
  declarations: [
    AgentInformationComponent,
    AgentComponent,
    AgentListComponent,
    AgentLocationComponent,
    AgentMapComponent,
    VisitHistoricComponent,
    FamilyListComponent,
    VisitHistoricListComponent,
    PerformanceChartComponent
  ],
  providers: [],
  exports: [
    AgentInformationComponent,
    AgentComponent,
    AgentListComponent,
    AgentLocationComponent,
    AgentMapComponent,
    VisitHistoricComponent,
    FamilyListComponent,
    VisitHistoricListComponent,
    PerformanceChartComponent
  ]
})
export class AgentModule { }
