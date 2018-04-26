import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileComponent } from './profile.component';
import { PageComponent } from './page/page.component';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HttpModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    ProfileListComponent,
    ProfileComponent,
    PageComponent
  ],
  exports: [
    ProfileListComponent,
    ProfileComponent,
    PageComponent
  ]
})
export class ProfileModule { }
