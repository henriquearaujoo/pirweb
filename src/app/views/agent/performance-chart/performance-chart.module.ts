import { SharedChartModule } from './../../../shared/shared-chart.module';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PerformanceChartComponent } from './performance-chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceChartRoutingModule } from './performance-chart-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PerformanceChartRoutingModule,
    HttpModule,
    FormsModule,
    SharedModule,
    SharedChartModule
  ],
  declarations: [
    PerformanceChartComponent
  ],
  exports: [PerformanceChartComponent]
})
export class PerformanceChartModule { }
