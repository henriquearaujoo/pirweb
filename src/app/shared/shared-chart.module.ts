import { ChartComponent } from './../components/chart/chart.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [
    ChartComponent
  ],
  exports: [ChartComponent]
})
export class SharedChartModule { }
