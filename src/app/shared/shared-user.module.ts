import { FormsModule } from '@angular/forms';
import { UserService } from './../services/user/user.service';
import { UserDetailsComponent } from './../views/user/user-details/user-details.component';
import { UserComponent } from './../views/user/user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    UserComponent,
    UserDetailsComponent
  ],
  providers: [
    UserService,
    UserDetailsComponent
  ],
  exports: [
    UserComponent,
    UserDetailsComponent
  ]
})
export class SharedUserModule { }
