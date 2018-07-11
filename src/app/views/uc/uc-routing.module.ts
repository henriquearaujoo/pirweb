import { UcDetailsComponent } from './uc-details/uc-details.component';
import { UcComponent } from './uc.component';
import { UcListComponent } from './uc-list/uc-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UcListComponent,
    // canActivate: [PageGuard]
  },
  {
    path: 'registro',
    component: UcComponent,
    // canActivate: [PageGuard]
  },
  {
    path: 'detalhes',
    component: UcDetailsComponent,
    // canActivate: [PageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UcRoutingModule { }
