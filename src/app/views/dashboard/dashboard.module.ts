import { SharedChartModule } from './../../shared/shared-chart.module';
import { SharedModule } from './../../shared/shared.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { ChartComponent } from './../../components/chart/chart.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpModule,
    FormsModule,
    MyDatePickerModule,
    SharedChartModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
