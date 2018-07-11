import { RegionalDetailsComponent } from './regional-details/regional-details.component';
import { RegionalComponent } from './regional.component';
import { PageGuard } from './../../guards/page.guard';
import { RegionalListComponent } from './regional-list/regional-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RegionalListComponent,
    // canActivate: [PageGuard]
  },
  {
    path: 'registro',
    component: RegionalComponent,
    // canActivate: [PageGuard]
  },
  {
    path: 'detalhes',
    component: RegionalDetailsComponent,
    // canActivate: [PageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionalRoutingModule { }
