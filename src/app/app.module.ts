import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions, HttpModule, ConnectionBackend } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {NgxPaginationModule} from 'ngx-pagination';
import {JasperoAlertsModule} from '@jaspero/ng2-alerts';

import { CdkTableModule } from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
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
  MatDialogModule
} from '@angular/material';
import { NgForm } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { RestService } from './services/rest/rest.service';
import { CostumerService } from './services/costumer/costumer.service';
import { PageService } from './services/pagenate/page.service';
import { AuthenticationService } from './services/login/authentication.service';
import { AlertService } from './services/alert/alert.service';
import { UserService } from './services/user/user.service';
import { CreateUserService } from './services/user-create/create-user.service';
import { ProfileService } from './services/profile/profile.service';
import { RuleService } from './services/rule/rule.service';
import { AccessPageService } from './services/page/page.service';

import { routing } from './app.router';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CostumerComponent } from './views/costumer/costumer.component';
import { PagenateComponent } from './components/pagenate/pagenate.component';
import { MapsComponent } from './views/maps/maps.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AgentComponent } from './views/agent/agent.component';
import { TemplateChapterComponent } from './views/template-chapter/template-chapter.component';
import { HomeLayoutComponent } from './components/layout/home-layout.component';
import { LoginLayoutComponent } from './components/layout/login-layout.component';
import { AlertComponent } from './components/alert/alert.component';
import { UserComponent } from './views/user/user.component';
import { UserListComponent } from './views/user/user-list/user-list.component';
import { ResetPasswordComponent } from './views/login/reset-password/reset-password.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ProfileListComponent } from './views/profile/profile-list/profile-list.component';
import { RuleComponent } from './views/profile/rule/rule.component';
import { PageComponent } from './views/profile/page/page.component';

import { ProfilePipe } from './views/profile/profile-list/profile.pipe';
import { UserPipe } from './views/user/user-list/user.pipe';
import { DefineRulesComponent } from './views/define-rules/define-rules.component';
import { ToastService } from './services/toast-notification/toast.service';
import { UserEditComponent } from './views/user/user-edit/user-edit.component';
import { UserDetailsComponent } from './views/user/user-details/user-details.component';
import { TemplateSelectModelComponent } from './views/template-chapter/template-select-model/template-select-model.component';
import { ChapterInformationComponent } from './views/template-chapter/chapter/chapter-information/chapter-information.component';
import { ReceptionComponent } from './views/template-chapter/chapter/reception/reception.component';
import { TaskComponent } from './views/template-chapter/chapter/task/task.component';
import { TemplateCollectDataComponent } from './views/template-chapter/template-collect-data/template-collect-data.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { ControlFieldErrorComponent } from './components/control-field-error/control-field-error.component';
import { InterventionComponent } from './views/template-chapter/chapter/intervention/intervention.component';
import { TaskListComponent } from './views/template-chapter/chapter/task/task-list/task-list.component';
import { TemplateChapterOptionComponent } from './views/template-chapter/template-chapter-option/template-chapter-option.component';
import { QuestionComponent } from './views/template-chapter/template-collect-data/question/question.component';
import { TemplateChapterItemComponent } from './views/template-chapter/template-chapter-item/template-chapter-item.component';
import { AnswerListComponent } from './views/template-chapter/template-collect-data/question/answer-list/answer-list.component';
import { TemplateCollectDataItemComponent } from './views/template-chapter/template-collect-data-item/template-collect-data-item.component';

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
    TemplateChapterComponent,
    LoginComponent,
    TemplateChapterItemComponent,
    HomeComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    AlertComponent,
    UserComponent,
    UserListComponent,
    ResetPasswordComponent,
    ProfileComponent,
    ProfileListComponent,
    UserPipe,
    ProfilePipe,
    RuleComponent,
    PageComponent,
    DefineRulesComponent,
    UserEditComponent,
    UserDetailsComponent,
    TemplateSelectModelComponent,
    TemplateChapterOptionComponent,
    ChapterInformationComponent,
    ReceptionComponent,
    TaskComponent,
    TemplateCollectDataComponent,
    TemplateCollectDataItemComponent,
    PaginateComponent,
    ControlFieldErrorComponent,
    InterventionComponent,
    TaskListComponent,
    QuestionComponent,
    TemplateChapterItemComponent,
    AnswerListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
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
    }),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    NgxPaginationModule,
    JasperoAlertsModule
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
    AccessPageService,
    ToastService,
    UserDetailsComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
