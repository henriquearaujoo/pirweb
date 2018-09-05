import { ResponsibleComponent } from './responsible.component';
import { ResponsibleDetailsComponent } from './responsible-details/responsible-details.component';
import { PageGuard } from './../../guards/page.guard';
import { ResponsibleListComponent } from './responsible-list/responsible-list.component';
import { AuthGuard } from './../../guards/auth.guard';
import { HomeLayoutComponent } from './../../components/layout/home-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ResponsibleListComponent,
    // canActivate: [PageGuard]
  },
  {
    path: 'detalhes',
    component: ResponsibleDetailsComponent,
    // canActivate: [PageGuard]
  },
  {
    path: 'registro',
    component: ResponsibleComponent,
    // canActivate: [PageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsibleRoutingModule { }
