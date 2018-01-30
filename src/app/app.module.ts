import { FileService } from './services/file/file.service';
// import { NgxSpinnerModule } from 'ngx-spinner';
import { ReceptionService } from './services/reception/reception.service';
import { InterventionService } from './services/intervention/intervention.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions, HttpModule, ConnectionBackend } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxPaginationModule } from 'ngx-pagination';
import {JasperoAlertsModule} from '@jaspero/ng2-alerts';
import { NgxEditorModule } from 'ngx-editor';
import { CKEditorModule } from 'ngx-ckeditor';
import { QuillEditorModule } from 'ng2-quill-editor';
import {ToastyModule} from 'ng2-toasty';
// import { NgProgressModule } from 'ngx-progressbar';

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
import { CommunityService } from './services/community/community.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Permissions } from './helpers/permissions';

import { routing } from './app.router';
import { AuthGuard } from './guards/auth.guard';
import { DeactivateGuard } from './guards/deactivate.guard';
import { PageGuard } from './guards/page.guard';

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
import { SendEmailComponent } from './views/login/send-email/send-email.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ProfileListComponent } from './views/profile/profile-list/profile-list.component';
import { RuleComponent } from './views/profile/rule/rule.component';
import { PageComponent } from './views/profile/page/page.component';

import { ProfilePipe } from './views/profile/profile-list/profile.pipe';
// import { UserPipe } from './views/user/user-list/user.pipe';
import { DefineRulesComponent } from './views/define-rules/define-rules.component';
import { ToastService } from './services/toast-notification/toast.service';
import { UserEditComponent } from './views/user/user-edit/user-edit.component';
import { UserDetailsComponent } from './views/user/user-details/user-details.component';
import { TemplateSelectModelComponent } from './views/template-chapter/template-select-model/template-select-model.component';

import { ReceptionComponent } from './views/template-chapter/chapter/reception/reception.component';
import { TaskComponent } from './views/template-chapter/chapter/task/task.component';
import { TemplateCollectDataComponent } from './views/template-chapter/template-collect-data/template-collect-data.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { ControlFieldErrorComponent } from './components/control-field-error/control-field-error.component';
import { InterventionComponent } from './views/template-chapter/chapter/intervention/intervention.component';
import { TaskListComponent } from './views/template-chapter/chapter/task/task-list/task-list.component';
import { TemplateChapterOptionComponent } from './views/template-chapter/template-chapter-option/template-chapter-option.component';
import { TemplateChapterItemComponent } from './views/template-chapter/template-chapter-item/template-chapter-item.component';
import { TemplateCollectDataItemComponent } from './views/template-chapter/template-collect-data-item/template-collect-data-item.component';
import { ChapterService } from './services/chapter/chapter.service';
import { ChapterDetailsComponent } from './views/template-chapter/chapter/chapter-details/chapter-details.component';
import { ChapterEditComponent } from './views/template-chapter/chapter/chapter-edit/chapter-edit.component';
import { ChapterDashboardComponent } from './views/template-chapter/chapter/chapter-dashboard/chapter-dashboard.component';

import { UserInformationAccountComponent } from './views/user/user-information-account/user-information-account.component';

import { UserPersonalInformationComponent } from './views/user/user-personal-information/user-personal-information.component';

import { UserAddressComponent } from './views/user/user-address/user-address.component';
import { ConclusionComponent } from './views/template-chapter/chapter/conclusion/conclusion.component';
import { InformationComponent } from './views/template-chapter/chapter/information/information.component';
import { ModalWaitingAnswerComponent } from './components/modal-waiting-answer/modal-waiting-answer.component';
import { ConclusionService } from './services/conclusion/conclusion.service';
import { QuestionComponent } from './views/template-chapter/chapter/conclusion/question/question.component';
import { AnswerListComponent } from './views/template-chapter/chapter/conclusion/question/answer-list/answer-list.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader/loader.service';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './components/modal/modal.service';
import { CommunityComponent } from './views/community/community.component';
import { CommunityListComponent } from './views/community/community-list/community-list.component';
import { Interceptor } from './helpers/interceptor';
import { MultimediaComponent } from './views/template-chapter/chapter/multimedia/multimedia.component';
import { MultimediaGalleryComponent } from './components/multimedia-gallery/multimedia-gallery.component';
import { UploadMultimediaComponent } from './components/upload-multimedia/upload-multimedia.component';
import { ResetPasswordComponent } from './views/login/reset-password/reset-password.component';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
// import { EqualValidator } from './directives/equal-validator.directive';

// import { PdfViewerModule } from 'ng2-pdf-viewer';


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
    SendEmailComponent,
    ProfileComponent,
    ProfileListComponent,
    // UserPipe,
    ProfilePipe,
    RuleComponent,
    PageComponent,
    DefineRulesComponent,
    UserEditComponent,
    UserDetailsComponent,
    TemplateSelectModelComponent,
    TemplateChapterOptionComponent,
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
    AnswerListComponent,
    ChapterDetailsComponent,
    ChapterEditComponent,
    ChapterDashboardComponent,
    UserInformationAccountComponent,
    UserPersonalInformationComponent,
    UserAddressComponent,
    ConclusionComponent,
    InformationComponent,
    ModalWaitingAnswerComponent,
    LoaderComponent,
    ModalComponent,
    CommunityComponent,
    CommunityListComponent,
    MultimediaComponent,
    MultimediaGalleryComponent,
    UploadMultimediaComponent,
    ResetPasswordComponent,
    EqualValidatorDirective

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
    JasperoAlertsModule,
    NgxEditorModule,
    CKEditorModule,
    QuillEditorModule,
    ToastyModule.forRoot(),
    HttpClientModule
    // PdfViewerModule
    // NgProgressModule
    // NgxSpinnerModule
  ],
  providers: [
    { provide: XHRBackend, useClass: Interceptor },
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
    ChapterService,
    InterventionService,
    ReceptionService,
    UserDetailsComponent,
    TemplateChapterItemComponent,
    ConclusionService,
    LoaderService,
    DeactivateGuard,
    Permissions,
    PageGuard,
    ModalService,
    CommunityService,
    FileService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
