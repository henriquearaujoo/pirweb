import { ReportComponent } from './report.component';
import { PageGuard } from './../../guards/page.guard';
import { AuthGuard } from './../../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
      canActivate: [PageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
