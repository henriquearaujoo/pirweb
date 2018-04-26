import { SharedModule } from './shared/shared.module';
// import { ResponsibleModule } from './views/responsible/responsible.module';
// import { TemplateChapterModule } from './views/template-chapter/template-chapter.module';
// import { AgentModule } from './views/agent/agent.module';
// import { UserModule } from './views/user/user.module';
import { FormService } from './services/form/form.service';
import { ChildService } from './services/child/child.service';
import { ResponsibleService } from './services/responsible/responsible.service';
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
// import {JasperoAlertsModule} from '@jaspero/ng2-alerts';
import { NgxEditorModule } from 'ngx-editor';
import { CKEditorModule } from 'ngx-ckeditor';
// import { QuillEditorModule } from 'ng2-quill-editor';
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
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgForm } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule } from '@angular/material/icon';
import {MyDatePickerModule} from 'mydatepicker';
// import { Ng2OrderModule } from 'ng2-order-pipe';

import { RestService } from './services/rest/rest.service';
import { CostumerService } from './services/costumer/costumer.service';
import { PageService } from './services/pagenate/page.service';
import { AuthenticationService } from './services/login/authentication.service';
import { AlertService } from './services/alert/alert.service';
import { UserService } from './services/user/user.service';
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
// import { HeaderBarComponent } from './components/header-bar/header-bar.component';
// import { SideBarComponent } from './components/side-bar/side-bar.component';
import { PagenateComponent } from './components/pagenate/pagenate.component';
import { MapsComponent } from './views/maps/maps.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
// import { AgentComponent } from './views/agent/agent.component';
import { TemplateChapterComponent } from './views/template-chapter/template-chapter.component';
// import { HomeLayoutComponent } from './components/layout/home-layout.component';
import { LoginLayoutComponent } from './components/layout/login-layout.component';
import { AlertComponent } from './components/alert/alert.component';
// import { UserComponent } from './views/user/user.component';
// import { UserListComponent } from './views/user/user-list/user-list.component';
import { SendEmailComponent } from './views/login/send-email/send-email.component';
// import { ProfileComponent } from './views/profile/profile.component';
// import { ProfileListComponent } from './views/profile/profile-list/profile-list.component';
// import { PageComponent } from './views/profile/page/page.component';

import { ProfilePipe } from './views/profile/profile-list/profile.pipe';
// import { UserPipe } from './views/user/user-list/user.pipe';
// import { ToastService } from './services/toast-notification/toast.service';
// import { UserEditComponent } from './views/user/user-edit/user-edit.component';
// import { UserDetailsComponent } from './views/user/user-details/user-details.component';
import { TemplateSelectModelComponent } from './views/template-chapter/template-select-model/template-select-model.component';

// import { ReceptionComponent } from './views/template-chapter/chapter/reception/reception.component';
import { TaskComponent } from './views/template-chapter/chapter/task/task.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { ControlFieldErrorComponent } from './components/control-field-error/control-field-error.component';
// import { InterventionComponent } from './views/template-chapter/chapter/intervention/intervention.component';
import { TaskListComponent } from './views/template-chapter/chapter/task/task-list/task-list.component';
import { TemplateChapterItemComponent } from './views/template-chapter/template-chapter-item/template-chapter-item.component';
import { ChapterService } from './services/chapter/chapter.service';
// import { ChapterDashboardComponent } from './views/template-chapter/chapter/chapter-dashboard/chapter-dashboard.component';
// import { ConclusionComponent } from './views/template-chapter/chapter/conclusion/conclusion.component';
// import { InformationComponent } from './views/template-chapter/chapter/information/information.component';
import { ModalWaitingAnswerComponent } from './components/modal-waiting-answer/modal-waiting-answer.component';
import { ConclusionService } from './services/conclusion/conclusion.service';
// import { QuestionComponent } from './views/template-chapter/chapter/conclusion/question/question.component';
// import { AnswerListComponent } from './views/template-chapter/chapter/conclusion/question/answer-list/answer-list.component';
// import { LoaderComponent } from './components/loader/loader.component';
// import { LoaderService } from './services/loader/loader.service';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './components/modal/modal.service';
import { CommunityComponent } from './views/community/community.component';
import { CommunityListComponent } from './views/community/community-list/community-list.component';
import { Interceptor } from './helpers/interceptor';
// import { MultimediaComponent } from './views/template-chapter/chapter/multimedia/multimedia.component';
// import { MultimediaGalleryComponent } from './components/multimedia-gallery/multimedia-gallery.component';
// import { UploadMultimediaComponent } from './components/upload-multimedia/upload-multimedia.component';
import { ResetPasswordComponent } from './views/login/reset-password/reset-password.component';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { Ng2InputMaskModule } from 'ng2-input-mask';
import { TextMaskModule } from 'angular2-text-mask';
import {NgxMaskModule} from 'ngx-mask';
import { ChildComponent } from './views/child/child.component';
import { MotherComponent } from './views/mother/mother.component';
import { MotherService } from './services/mother/mother.service';
import { MotherListComponent } from './views/mother/mother-list/mother-list.component';
// import { ResponsibleComponent } from './views/responsible/responsible.component';
// import { ResponsibleListComponent } from './views/responsible/responsible-list/responsible-list.component';
import { ChildListComponent } from './views/child/child-list/child-list.component';
import { SweetAlertService } from './services/sweetalert/sweet-alert.service';
import { CommunityDetailsComponent } from './views/community/community-details/community-details.component';
import { MotherDetailsComponent } from './views/mother/mother-details/mother-details.component';
// import { ResponsibleDetailsComponent } from './views/responsible/responsible-details/responsible-details.component';
import { ChildDetailsComponent } from './views/child/child-details/child-details.component';
import { FormTemplateComponent } from './views/form-template/form-template.component';
import { FormTemplateListComponent } from './views/form-template/form-template-list/form-template-list.component';
import { FormTemplateDetailsComponent } from './views/form-template/form-template-details/form-template-details.component';
// import { AgentListComponent } from './views/agent/agent-list/agent-list.component';
// import { AgentLocationComponent} from './views/agent/agent-location/agent-location.component';
// import { AgentMapComponent } from './views/agent/agent-map/agent-map.component';
// import { VisitHistoricComponent } from './views/agent/visit-historic/visit-historic.component';
// import { FamilyListComponent } from './views/agent/visit-historic/family-list/family-list.component';
// import { VisitHistoricListComponent } from './views/agent/visit-historic/visit-historic-list/visit-historic-list.component';
// import { AgentInformationComponent } from './views/agent/agent-information/agent-information.component';
import { ChartComponent } from './components/chart/chart.component';
// import { PerformanceChartComponent } from './views/agent/performance-chart/performance-chart.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { ProfileModule } from './views/profile/profile.module';
// import { QuillModule } from 'ngx-quill';
// import { EqualValidator } from './directives/equal-validator.directive';

// import { PdfViewerModule } from 'ng2-pdf-viewer';


export function httpFactory(backend: ConnectionBackend, defaultOptions: RequestOptions, router: Router) {}

@NgModule({
  declarations: [
    AppComponent,
    // HeaderBarComponent,
    // SideBarComponent,
    // MapsComponent,
    PagenateComponent,
    DashboardComponent,
    // AgentComponent,
    // TemplateChapterComponent,
    LoginComponent,
    // TemplateChapterItemComponent,
    HomeComponent,
    // HomeLayoutComponent,
    LoginLayoutComponent,
    AlertComponent,
    // UserComponent,
    // UserListComponent,
    SendEmailComponent,
    // ProfileComponent,
    // ProfileListComponent,
    // UserPipe,
    ProfilePipe,
    // PageComponent,
    // UserEditComponent,
    // UserDetailsComponent,
    TemplateSelectModelComponent,
    // ReceptionComponent,
    TaskComponent,
    // PaginateComponent,
    // ControlFieldErrorComponent,
    // InterventionComponent,
    TaskListComponent,
    // QuestionComponent,
    // TemplateChapterItemComponent,
    // AnswerListComponent,
    // ChapterDashboardComponent,
    // ConclusionComponent,
    // InformationComponent,
    ModalWaitingAnswerComponent,
    // LoaderComponent,
    // ModalComponent,
    CommunityComponent,
    CommunityListComponent,
    // MultimediaComponent,
    // MultimediaGalleryComponent,
    // UploadMultimediaComponent,
    ResetPasswordComponent,
    EqualValidatorDirective,
    ChildComponent,
    MotherComponent,
    MotherListComponent,
    // ResponsibleComponent,
    // ResponsibleListComponent,
    ChildListComponent,
    CommunityDetailsComponent,
    MotherDetailsComponent,
    // ResponsibleDetailsComponent,
    ChildDetailsComponent,
    FormTemplateComponent,
    FormTemplateListComponent,
    FormTemplateDetailsComponent,
    // AgentListComponent,
    // AgentLocationComponent,
    // AgentMapComponent,
    // VisitHistoricComponent,
    // FamilyListComponent,
    // VisitHistoricListComponent,
    // AgentInformationComponent,
    // ChartComponent,
    // PerformanceChartComponent

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
    TextMaskModule,
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
    SimpleNotificationsModule.forRoot(),
    NgxPaginationModule,
    // JasperoAlertsModule,
    NgxEditorModule,
    CKEditorModule,
    // QuillEditorModule,
    ToastyModule.forRoot(),
    HttpClientModule,
    NgxMaskModule,
    MyDatePickerModule,
    ChartsModule,
    SharedModule,
    // UserModule,
    // AgentModule,
    // ProfileModule
    // TemplateChapterModule,
    // ResponsibleModule
  ],
  providers: [
    { provide: XHRBackend, useClass: Interceptor },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // { provide: Http, useClass: Interceptor },
    RestService,
    PageService,
    CostumerService,
    AuthenticationService,
    AuthGuard,
    UserService,
    AlertService,
    ProfileService,
    RuleService,
    AccessPageService,
    // ToastService,
    ChapterService,
    InterventionService,
    ReceptionService,
    // UserDetailsComponent,
    // TemplateChapterItemComponent,
    ConclusionService,
    // LoaderService,
    DeactivateGuard,
    Permissions,
    PageGuard,
    ModalService,
    CommunityService,
    FileService,
    MotherService,
    ResponsibleService,
    ChildService,
    SweetAlertService,
    FormService
  ],
  exports: [
    MyDatePickerModule
    // ModalComponent,
    // PaginateComponent,
    // ChartsModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
