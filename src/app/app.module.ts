import { AlertService } from './services/alert/alert.service';
import { UserService } from './services/login/user.service';
import {CreateUserService} from './services/user-create/create-user.service'
import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions, HttpModule, ConnectionBackend } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CdkTableModule } from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { NgForm } from '@angular/forms';

import { AppComponent } from './app.component';

import { RestService } from './services/rest/rest.service';
import { CostumerService } from './services/costumer/costumer.service';
import { PageService } from './services/pagenate/page.service';
import { AuthenticationService } from './services/login/authentication.service';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CostumerComponent } from './views/costumer/costumer.component';
import { PagenateComponent } from './components/pagenate/pagenate.component';
import { routing } from './app.router';
import { MapsComponent } from './views/maps/maps.component';

import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AgmCoreModule } from '@agm/core';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AgentComponent } from './views/agent/agent.component';
import { TemplateFormsComponent } from './views/template-forms/template-forms.component';
import { TemplateItemComponent } from './components/template-item/template-item.component';
import { HomeLayoutComponent } from './components/layout/home-layout.component';
import { LoginLayoutComponent } from './components/layout/login-layout.component';
import { AlertComponent } from './components/alert/alert.component';
import { UserComponent } from './views/user/user.component';

import { UserListComponent } from './views/user-list/user-list.component';

import { ResetPasswordComponent } from './views/login/reset-password/reset-password.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ProfileService } from './services/profile/profile.service';
import { ProfileListComponent } from './views/profile/profile-list/profile-list.component';
import { ProfilePipe } from './views/profile/profile-list/profile.pipe';
import { RuleService } from './services/rule/rule.service';
import { RuleComponent } from './views/profile/rule/rule.component';
import { PageComponent } from './views/profile/page/page.component';
import { AccessPageService } from './services/page/access-page.service';


export function httpFactory(backend: ConnectionBackend, defaultOptions: RequestOptions, router: Router) {}

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    SideBarComponent,
    MapsComponent,
    CostumerComponent,
    PagenateComponent,
    DashboardComponent,
    AgentComponent,
    TemplateFormsComponent,
    LoginComponent,
    TemplateItemComponent,
    HomeComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    AlertComponent,
    UserComponent,
    UserListComponent,
    ResetPasswordComponent,
    ProfileComponent,
    ProfileListComponent,
    ProfilePipe,
    RuleComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    //CdkTableModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDo5LxyVUv5EwGQBwaveIF4d0MaIVD_Dd8'
    })
  ],
  providers: [
    RestService,
    PageService,
    CostumerService,
    AuthenticationService,
    AuthGuard,
    UserService,
    AlertService,
    CreateUserService,
    ProfileService,
    RuleService,
    AccessPageService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
