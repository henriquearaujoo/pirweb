import { PageGuard } from './../../../guards/page.guard';
import { AgentMapComponent } from './agent-map.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AgentMapComponent,
      canActivate: [PageGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentMapRoutingModule { }
