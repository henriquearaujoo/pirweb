import { BigraphService } from './../../services/bi-graph/bigraph.service';
import { PageComponent } from './../profile/page/page.component';
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';

@NgModule({
    imports: [
      CommonModule,
      ReportRoutingModule,
      HttpModule,
      FormsModule,
      SharedModule
    ],
    declarations: [
      ReportComponent

    ],
    exports: [
      ReportComponent
    ],
    providers: [
      BigraphService
    ]
  })
  export class ReportModule { }
