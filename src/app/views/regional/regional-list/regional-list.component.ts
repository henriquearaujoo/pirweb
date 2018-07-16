import { PageService } from './../../../services/pagenate/page.service';
import { PagenateComponent } from './../../../components/pagenate/pagenate.component';
import { ToastService } from './../../../services/toast-notification/toast.service';
import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { RegionalService } from './../../../services/regional/regional.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Paginate } from './../../../models/paginate';
import { Regional } from './../../../models/regional';
import { Component, OnInit, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-regional-list',
  templateUrl: './regional-list.component.html',
  styleUrls: ['./regional-list.component.css']
})
export class RegionalListComponent extends PagenateComponent implements OnInit, OnDestroy {

  private cities: any[] = new Array();
  private regional: Regional = new Regional();
  private regionais: Regional[] = new Array();
  private paginate: Paginate = new Paginate();
  private subscription: Subscription;
  private hasdata: boolean;
  private filter: any = { name: ''};
  @Output() page: number;

  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private index: number;

  constructor(
    private router: Router,
    private regionalService: RegionalService,
    private toastService: ToastService,
    private permissions: Permissions,
    private loaderService: LoaderService,
    private servicePage: PageService
  ) {
    super(servicePage);
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
      this.index = 1;
    }

  ngOnInit() {
    this.permissions.canActivate(['/regionais']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.page = 0;
    this.hasdata = false;
    this.getRegionais();
    localStorage.removeItem('regionalId');
  }

  getRegionais() {
    if ( this.filter.name !== '') { this.page = 0; }
    this.loaderService.show();
    this.subscription = this.regionalService.getRegionais(this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.regionais = this.paginate.content;
        console.log( success);
        // this.regionais = success;
        this.index = 1;
        this.regionais.forEach( elem => {
            elem.number = this.index ++;
          }
        );
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

  setRegional(regional: Regional) {
    localStorage.setItem('regionalId', regional.id);
    this.router.navigate(['/regionais/registro']);
  }

  toView(regional: Regional) {
    localStorage.setItem('regionalId', regional.id);
    this.router.navigate(['/regionais/detalhes']);
  }

  toViewUC(regional: Regional) {
    this.regional = regional;
    this.allItems = this.regional.unities;
    this.pagedItems = this.regional.unities;
    this.setPage(1);
  }

  // changeStatus(regional: Regional) {
  //   this.regional = regional;
  // }

  _setPage(page: number) {
    this.page = page;
    this.getRegionais();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
