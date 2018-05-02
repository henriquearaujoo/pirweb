import { SharedModule } from './shared/shared.module';

import { FormService } from './services/form/form.service';
import { ChildService } from './services/child/child.service';
import { ResponsibleService } from './services/responsible/responsible.service';
import { FileService } from './services/file/file.service';
import { ReceptionService } from './services/reception/reception.service';
import { InterventionService } from './services/intervention/intervention.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions, HttpModule, ConnectionBackend } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {ToastyModule} from 'ng2-toasty';

import { CdkTableModule } from '@angular/cdk/table';
import {
  MatCardModule,
  MatTooltipModule
} from '@angular/material';
import { NgForm } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule } from '@angular/material/icon';
import { RestService } from './services/rest/rest.service';
import { PageService } from './services/pagenate/page.service';
import { AuthenticationService } from './services/login/authentication.service';
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
import { PagenateComponent } from './components/pagenate/pagenate.component';
import { HomeComponent } from './components/home/home.component';
import { HomeLayoutComponent } from './components/layout/home-layout.component';
import { LoginLayoutComponent } from './components/layout/login-layout.component';
import { AlertComponent } from './components/alert/alert.component';
import { ProfilePipe } from './views/profile/profile-list/profile.pipe';
import { TemplateSelectModelComponent } from './views/template-chapter/template-select-model/template-select-model.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { ChapterService } from './services/chapter/chapter.service';
import { ModalWaitingAnswerComponent } from './components/modal-waiting-answer/modal-waiting-answer.component';
import { ConclusionService } from './services/conclusion/conclusion.service';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './components/modal/modal.service';
import { Interceptor } from './helpers/interceptor';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { PregnantService } from './services/pregnant/pregnant.service';
import { SweetAlertService } from './services/sweetalert/sweet-alert.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { VisitService } from './services/visit/visit.service';


export function httpFactory(backend: ConnectionBackend, defaultOptions: RequestOptions, router: Router) {}

@NgModule({
  declarations: [
    AppComponent,
    PagenateComponent,
    HomeComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    AlertComponent,
    ProfilePipe,
    TemplateSelectModelComponent,
    ModalWaitingAnswerComponent,
    EqualValidatorDirective,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    CdkTableModule,
    MatCardModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDo5LxyVUv5EwGQBwaveIF4d0MaIVD_Dd8'
    }),
    NgxPaginationModule,
    ToastyModule.forRoot(),
    HttpClientModule,
    SharedModule
  ],
  providers: [
    { provide: XHRBackend, useClass: Interceptor },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    RestService,
    PageService,
    AuthenticationService,
    AuthGuard,
    UserService,
    ProfileService,
    RuleService,
    AccessPageService,
    ChapterService,
    InterventionService,
    ReceptionService,
    ConclusionService,
    DeactivateGuard,
    Permissions,
    PageGuard,
    ModalService,
    CommunityService,
    FileService,
    PregnantService,
    ResponsibleService,
    ChildService,
    SweetAlertService,
    FormService,
    VisitService
  ],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
