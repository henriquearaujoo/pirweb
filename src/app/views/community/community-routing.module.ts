import { CommunityDetailsComponent } from './community-details/community-details.component';
import { CommunityComponent } from './community.component';
import { PageGuard } from './../../guards/page.guard';
import { CommunityListComponent } from './community-list/community-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CommunityListComponent,
    canActivate: [PageGuard]
  },
  {
    path: 'registro',
    component: CommunityComponent,
    canActivate: [PageGuard]
  },
  {
    path: 'detalhes',
    component: CommunityDetailsComponent,
    canActivate: [PageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
