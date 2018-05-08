import { SharedUserModule } from './../../../shared/shared-user.module';
import { SharedChartModule } from './../../../shared/shared-chart.module';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { VisitHistoryListComponent } from './visit-history-list/visit-history-list.component';
import { FamilyListComponent } from './family-list/family-list.component';
import { VisitHistoryComponent } from './visit-history.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitHistoryRoutingModule } from './visit-history-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VisitHistoryRoutingModule,
    HttpModule,
    FormsModule,
    SharedModule,
    SharedChartModule,
    SharedUserModule,
  ],
  declarations: [
    VisitHistoryComponent,
    FamilyListComponent,
    VisitHistoryListComponent
  ],
  exports: [
    VisitHistoryComponent,
    FamilyListComponent,
    VisitHistoryListComponent
  ]
})
export class VisitHistoryModule { }
