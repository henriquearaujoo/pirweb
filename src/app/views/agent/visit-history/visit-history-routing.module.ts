import { FamilyListComponent } from './family-list/family-list.component';
import { VisitHistoryListComponent } from './visit-history-list/visit-history-list.component';
import { PageGuard } from './../../../guards/page.guard';
import { VisitHistoryComponent } from './visit-history.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: VisitHistoryComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'historico',
    component: VisitHistoryListComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'familias',
    component: FamilyListComponent,
      canActivate: [PageGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitHistoryRoutingModule { }
