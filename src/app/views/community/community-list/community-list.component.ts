import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { ToastService } from './../../../services/toast-notification/toast.service';
import { Paginate } from './../../../models/paginate';
import { Community } from './../../../models/community';
import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CommunityService } from '../../../services/community/community.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css']
})
export class CommunityListComponent implements OnInit, OnDestroy {

  private cities: any[] = new Array();
  private community: Community = new Community();
  private communities: Community[] = new Array();
  private paginate: Paginate = new Paginate();
  private subscription: Subscription;
  private hasdata: boolean;
  private filter: any = { name: ''};
  @Output() page: number;

  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
    private router: Router,
    private communityService: CommunityService,
    private toastService: ToastService,
    private permissions: Permissions,
    private loaderService: LoaderService
  ) {
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
    }

  ngOnInit() {
    this.permissions.canActivate('/community-list');
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
        // this.loaderService.hide();
      }
    );
    this.page = 0;
    this.hasdata = false;
    this.getCommunities();
    localStorage.removeItem('communityId');
  }

  getCommunities() {
    console.log(this.filter.name);
    if ( this.filter.name !== '') { this.page = 0; }
    this.loaderService.show();
    this.subscription = this.communityService.getCommunities(this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.communities = this.paginate.content;
        this.communities.forEach( el => {
          this.communityService.getCity(el.city_id).subscribe(
            s => {
              el.city_id = s.name;
            },
            error => console.log(error)
          );
        });
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

  setCommunity(community: Community) {
    localStorage.setItem('communityId', community.id);
    this.router.navigate(['community']);
  }

  changeStatus(community: Community) {
    this.community = community;
  }

  disableEnableCommunity() {
    if (this.community.status === true) {
      this.community.status = false;
    } else {
      this.community.status = true;
    }
    console.log(this.community.status);

    this.communityService.update(this.community).subscribe(
      success => {
        this.toastService.toastSuccess();
        this.getCommunities();
      },
      error => console.log(error)
    );
  }

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
