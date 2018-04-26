import { SharedModule } from './../../shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';
import { UserService } from './../../services/user/user.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedUserModule } from '../../shared/shared-user.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpModule,
    FormsModule,
    SharedModule,
    SharedUserModule
  ],
  declarations: [
    UserListComponent
  ],
  providers: [],
  exports: [
    UserListComponent
  ]
})
export class UserModule { }
