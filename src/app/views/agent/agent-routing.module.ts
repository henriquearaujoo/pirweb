import { AuthGuard } from './../../guards/auth.guard';
import { HomeLayoutComponent } from './../../components/layout/home-layout.component';
import { PerformanceChartComponent } from './performance-chart/performance-chart.component';
import { FamilyListComponent } from './visit-history/family-list/family-list.component';
import { VisitHistoryListComponent } from './visit-history/visit-history-list/visit-history-list.component';
import { VisitHistoryComponent } from './visit-history/visit-history.component';
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
    path: 'registro',
    component: UserComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'detalhes',
    component: UserDetailsComponent,
      canActivate: [PageGuard]
  },
  // {
  //   path: 'lista',
  //   component: AgentListComponent,
  //     canActivate: [PageGuard]
  // },
  {
    path: 'localizacao',
    component: AgentLocationComponent,
      canActivate: [PageGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
