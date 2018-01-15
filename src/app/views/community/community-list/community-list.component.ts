import { ToastService } from './../../../services/toast-notification/toast.service';
import { Paginate } from './../../../models/paginate';
import { Community } from './../../../models/community';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CommunityService } from '../../../services/community/community.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css']
})
export class CommunityListComponent implements OnInit, OnDestroy {

  private community: Community = new Community();
  private communities: Community[] = new Array();
  private paginate: Paginate = new Paginate();
  private subscription: Subscription;
  private hasdata: boolean;
  private filter: any = { name: ''};
  private page: number;

  constructor(
    private router: Router,
    private communityService: CommunityService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.hasdata = false;
    this.getCommunities();
  }

  getCommunities() {
    this.subscription = this.communityService.getCommunity().subscribe(
      success => {
        // this.paginate = success;
        // this.communities = this.paginate.content;
        this.communities = success;
        this.hasdata = true;
      },
      error => console.log(error)
    );

  }
  setCommunity(community: Community) {
    localStorage.setItem('communityId', community.id.toString());
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
