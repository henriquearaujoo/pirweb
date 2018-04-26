import { AuthGuard } from './../../guards/auth.guard';
import { HomeLayoutComponent } from './../../components/layout/home-layout.component';
import { PerformanceChartComponent } from './performance-chart/performance-chart.component';
import { FamilyListComponent } from './visit-historic/family-list/family-list.component';
import { VisitHistoricListComponent } from './visit-historic/visit-historic-list/visit-historic-list.component';
import { VisitHistoricComponent } from './visit-historic/visit-historic.component';
import { AgentMapComponent } from './agent-map/agent-map.component';
import { AgentLocationComponent } from './agent-location/agent-location.component';
import { AgentInformationComponent } from './agent-information/agent-information.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { UserDetailsComponent } from './../user/user-details/user-details.component';
import { PageGuard } from './../../guards/page.guard';
import { UserComponent } from './../user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AgentInformationComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'agent',
    component: UserComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'details',
    component: UserDetailsComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'list',
    component: AgentListComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'location',
    component: AgentLocationComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'map',
    component: AgentMapComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'visit-historic',
    component: VisitHistoricComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'visit-historic-list',
    component: VisitHistoricListComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'family-list',
    component: FamilyListComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'performance-chart',
    component: PerformanceChartComponent
      // canActivate: [PageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
