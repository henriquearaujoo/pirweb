import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { CommunityService } from './../../../services/community/community.service';
import { ResponsibleService } from './../../../services/responsible/responsible.service';
import { ToastService } from './../../../services/toast-notification/toast.service';
import { ChildService } from './../../../services/child/child.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Paginate } from './../../../models/paginate';
import { Child } from './../../../models/child';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.css']
})
export class ChildListComponent implements OnInit, OnDestroy {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private child: Child = new Child();
  private children: Child[] = new Array();
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
    private childService: ChildService,
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
    }

  ngOnInit() {
    this.permissions.canActivate('/child-list');
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
    this.getChildren();
    localStorage.removeItem('childId');
  }

  getChildren() {
    console.log(this.filter.name);
    if ( this.filter.name !== '') { this.page = 0; }
    this.loaderService.show();
    this.subscription = this.childService.getChildren(this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.children = this.paginate.content;
        this.children.forEach( el => {
          this.responsibleService.load(el.responsible_id).subscribe(
            s1 => {
              el.responsible_id = s1.name;
            }
          );
        });

        console.log(this.children);
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
  setChild(child: Child) {
    localStorage.setItem('childId', child.id.toString());
    this.router.navigate(['child']);
  }

  changeStatus(child: Child) {
    this.child = child;
  }

  // disableEnableChild() {
  //   if (this.child.status === true) {
  //     this.child.status = false;
  //   } else {
  //     this.child.status = true;
  //   }
  //   console.log(this.child.status);

  //   this.childService.update(this.child).subscribe(
  //     success => {
  //       this.toastService.toastSuccess();
  //       this.getChildren();
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
