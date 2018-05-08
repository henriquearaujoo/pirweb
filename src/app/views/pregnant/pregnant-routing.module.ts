import { PregnantComponent } from './pregnant.component';
import { PregnantDetailsComponent } from './pregnant-details/pregnant-details.component';
import { PageGuard } from './../../guards/page.guard';
import { PregnantListComponent } from './pregnant-list/pregnant-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PregnantListComponent,
    canActivate: [PageGuard]
  },
  {
    path: 'detalhes',
    component: PregnantDetailsComponent,
    canActivate: [PageGuard]
  },
  {
    path: 'registro',
    component: PregnantComponent,
    canActivate: [PageGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PregnantRoutingModule { }
