import { Permissions, RuleState } from './../../../helpers/permissions';
import { ToastService } from './../../../services/toast-notification/toast.service';
import { ResponsibleService } from './../../../services/responsible/responsible.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Paginate } from './../../../models/paginate';
import { Responsible } from './../../../models/responsible';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunityService } from '../../../services/community/community.service';

@Component({
  selector: 'app-responsible-list',
  templateUrl: './responsible-list.component.html',
  styleUrls: ['./responsible-list.component.css']
})
export class ResponsibleListComponent implements OnInit, OnDestroy {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private responsible: Responsible = new Responsible();
  private responsibleList: Responsible[] = new Array();
  private paginate: Paginate = new Paginate();
  private subscription: Subscription;
  private hasdata: boolean;
  private filter: any = { name: ''};
  private page: number;

  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
    private router: Router,
    private responsibleService: ResponsibleService,
    private communityService: CommunityService,
    private toastService: ToastService,
    private permissions: Permissions
  ) {
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
  }

  ngOnInit() {
    this.permissions.canActivate('/responsible');
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
        // this.loaderService.hide();
      }
    );
    this.hasdata = false;
    this.getResponsible();
    localStorage.removeItem('responsibleId');
  }

  getResponsible() {
    console.log(this.filter.name);
    if ( this.filter.name !== '') { this.page = 0; }
    this.subscription = this.responsibleService.getResponsible(this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.responsibleList = this.paginate.content;
        this.responsibleList.forEach( el => {
          this.communityService.load(el.community_id).subscribe(
            s => {
              el.community_id = s.name;
            },
            error => console.log(error)
          );
        });
        console.log('responsibleList', this.responsibleList);
        this.hasdata = true;
      },
      error => console.log(error)
    );
  }

  setResponsible(responsible: Responsible) {
    localStorage.setItem('responsibleId', responsible.id);
    this.router.navigate(['responsible']);
  }

  changeStatus(responsible: Responsible) {
    this.responsible = responsible;
  }

  // disableEnableResponsible() {
  //   if (this.responsible.status === true) {
  //     this.responsible.status = false;
  //   } else {
  //     this.responsible.status = true;
  //   }
  //   console.log(this.responsible.status);

  //   this.responsibleService.update(this.responsible).subscribe(
  //     success => {
  //       this.toastService.toastSuccess();
  //       this.getResponsible();
  //     },
  //     error => console.log(error)
  //   );
  // }

  setPage(page: number) {
    this.page = page;
    console.log('Página:', this.page);
    console.log('Filtro:', this.filter.name);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('OnDestroy()');
  }

}
