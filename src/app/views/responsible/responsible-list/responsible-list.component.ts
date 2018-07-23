import { LoaderService } from './../../../services/loader/loader.service';
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
    private permissions: Permissions,
    private loaderService: LoaderService
  ) {
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
    this.page = 0;
  }

  ngOnInit() {
    this.permissions.canActivate(['/familias']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.hasdata = false;
    this.getResponsibles();
    localStorage.removeItem('responsibleId');
    localStorage.removeItem('route');
  }

  getResponsibles() {
    if ( this.filter.name !== '') { this.page = 0; }
    this.loaderService.show();
    this.subscription = this.responsibleService.getResponsibles(this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.responsibleList = this.paginate.content;
        console.log(this.responsibleList);
        this.hasdata = true;
        setTimeout(() => {
          this.loaderService.hide();
        }, 400);
      },
      error => {
        this.loaderService.hide();
        this.hasdata = false;
      }
    );
  }

  setResponsible(responsible: Responsible) {
    localStorage.setItem('responsibleId', responsible.id);
    this.router.navigate(['/responsaveis/registro']);
  }

  toView(responsible: Responsible) {
    localStorage.setItem('responsibleId', responsible.id);
    this.router.navigate(['/responsaveis/detalhes']);
  }

  changeStatus(responsible: Responsible) {
    this.responsible = responsible;
  }

  setPage(page: number) {
    this.page = page;
    this.getResponsibles();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
