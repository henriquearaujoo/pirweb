import { JasperoAlertsModule } from '@jaspero/ng2-alerts';
import { RouterModule } from '@angular/router';
import { ToastService } from './../services/toast-notification/toast.service';
import { LoaderService } from './../services/loader/loader.service';
import { LoaderComponent } from './../components/loader/loader.component';
// import { HomeLayoutComponent } from './../components/layout/home-layout.component';
import { HomeComponent } from './../components/home/home.component';
import { NgxMaskModule } from 'ngx-mask';
import { HeaderBarComponent } from './../components/header-bar/header-bar.component';
import { SideBarComponent } from './../components/side-bar/side-bar.component';
import { MapsComponent } from './../views/maps/maps.component';
import { ControlFieldErrorComponent } from './../components/control-field-error/control-field-error.component';
// import { ChartComponent } from './../components/chart/chart.component';
import { PaginateComponent } from './../components/paginate/paginate.component';
import { ModalComponent } from './../components/modal/modal.component';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    NgxMaskModule,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDo5LxyVUv5EwGQBwaveIF4d0MaIVD_Dd8'
    }),
    JasperoAlertsModule,
  ],
  declarations: [
    HeaderBarComponent,
    SideBarComponent,
    ModalComponent,
    PaginateComponent,
    LoaderComponent,
    ControlFieldErrorComponent,
    MapsComponent
  ],
  providers: [
    LoaderService,
    ToastService
  ],
  exports: [
    HeaderBarComponent,
    SideBarComponent,
    ModalComponent,
    PaginateComponent,
    LoaderComponent,
    ControlFieldErrorComponent,
    SimpleNotificationsModule,
    MapsComponent
  ]
})
export class SharedModule { }
