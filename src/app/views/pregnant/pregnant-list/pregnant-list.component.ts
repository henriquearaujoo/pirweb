import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { PageService } from './../../../services/pagenate/page.service';
import { PagenateComponent } from './../../../components/pagenate/pagenate.component';
import { CommunityService } from './../../../services/community/community.service';
import { ToastService } from './../../../services/toast-notification/toast.service';
import { ResponsibleService } from './../../../services/responsible/responsible.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Paginate } from './../../../models/paginate';
import { Responsible } from './../../../models/responsible';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pregnant-list',
  templateUrl: './pregnant-list.component.html',
  styleUrls: ['./pregnant-list.component.css']
})
export class PregnantListComponent implements OnInit, OnDestroy {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private responsible: Responsible = new Responsible();
  private responsibleList: Responsible[] = new Array();
  private mothers: Responsible[] = new Array();
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
    private servicePage: PageService,
    private permissions: Permissions,
    private loaderService: LoaderService
  ) {
      this.page = 0;
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
   }

  ngOnInit() {
    this.permissions.canActivate(['/gestantes']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.hasdata = false;
    this.page = 0;
    this.getMothers();
    localStorage.removeItem('motherId');
  }

  getMothers() {
    if ( this.filter.name !== '') { this.page = 0; }
    this.loaderService.show();
    this.subscription = this.responsibleService.getMothers(this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.responsibleList = this.paginate.content;
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

  setMother(responsible: Responsible) {
    localStorage.setItem('motherId', responsible.id);
    this.router.navigate(['/gestantes/registro']);
  }

  toView(responsible: Responsible) {
    localStorage.setItem('motherId', responsible.id);
    this.router.navigate(['/gestantes/detalhes']);
  }

  changeStatus(responsible: Responsible) {
    this.responsible = responsible;
  }

  setPage(page: number) {
    this.page = page;
    this.getMothers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
