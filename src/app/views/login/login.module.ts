import { SharedModule } from './../../shared/shared.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SendEmailComponent } from './send-email/send-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpModule,
    FormsModule,
    MyDatePickerModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    SendEmailComponent
  ],
  exports: [
    LoginComponent,
    ResetPasswordComponent,
    SendEmailComponent
  ]
})
export class LoginModule { }
