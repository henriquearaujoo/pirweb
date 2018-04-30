import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PageGuard } from './../../guards/page.guard';
import { AuthGuard } from './../../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
