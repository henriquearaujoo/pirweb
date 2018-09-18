import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicencesComponent } from './licences/licences.component';
import { AboutRoutingModule } from './about.routing';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule
  ],
  declarations: [
    LicencesComponent
  ]
})
export class AboutModule { }
