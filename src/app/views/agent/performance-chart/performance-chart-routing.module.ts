import { PageGuard } from './../../../guards/page.guard';
import { PerformanceChartComponent } from './performance-chart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PerformanceChartComponent,
      canActivate: [PageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceChartRoutingModule { }
