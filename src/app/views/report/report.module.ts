import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportFilterComponent } from './../../components/report-filter/report-filter.component';
import { BigraphService } from './../../services/bi-graph/bigraph.service';
import { PageComponent } from './../profile/page/page.component';
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { NgForm } from '@angular/forms';
import { ReportEntityComponent } from './report-entity/report-entity.component';
import { ReportColumnComponent } from './report-column/report-column.component';
@NgModule({
    imports: [
      CommonModule,
      ReportRoutingModule,
      HttpModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule
    ],
    declarations: [
      ReportComponent,
      ReportFilterComponent,
      ReportEntityComponent,
      ReportColumnComponent,
    ],
    exports: [
      ReportComponent
    ],
    providers: [
      BigraphService
    ]
  })
  export class ReportModule { }
