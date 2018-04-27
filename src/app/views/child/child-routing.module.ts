import { ChildComponent } from './child.component';
import { ChildDetailsComponent } from './child-details/child-details.component';
import { PageGuard } from './../../guards/page.guard';
import { ChildListComponent } from './child-list/child-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ChildListComponent,
    canActivate: [PageGuard]
  },
  {
    path: 'details',
    component: ChildDetailsComponent,
    canActivate: [PageGuard]
  },
  {
    path: 'child',
    component: ChildComponent,
    canActivate: [PageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutingModule { }
