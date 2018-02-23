import { CommunityService } from './../../../services/community/community.service';
import { ToastService } from './../../../services/toast-notification/toast.service';
import { MotherService } from './../../../services/mother/mother.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Paginate } from './../../../models/paginate';
import { Mother } from './../../../models/mother';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-mother-list',
  templateUrl: './mother-list.component.html',
  styleUrls: ['./mother-list.component.css']
})
export class MotherListComponent implements OnInit, OnDestroy {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private mother: Mother = new Mother();
  private mothers: Mother[] = new Array();
  private paginate: Paginate = new Paginate();
  private subscription: Subscription;
  private hasdata: boolean;
  private filter: any = { name: ''};
  private page: number;

  constructor(
    private router: Router,
    private motherService: MotherService,
    private communityService: CommunityService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.hasdata = false;
    this.page = 0;
    this.getMothers();
    localStorage.removeItem('motherId');
  }

  getMothers() {
    console.log(this.filter.name);
    if ( this.filter.name !== '') { this.page = 0; }
    this.subscription = this.motherService.getMothers(this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.mothers = this.paginate.content;
        this.mothers.forEach( el => {
          this.communityService.load(el.community_id).subscribe(
            s => {
              el.community_id = s.name;
            },
            error => console.log(error)
          );
        });
        this.hasdata = true;
      },
      error => console.log(error)
    );

  }
  setMother(mother: Mother) {
    localStorage.setItem('motherId', mother.id);
    this.router.navigate(['mother']);
  }

  changeStatus(mother: Mother) {
    this.mother = mother;
  }

  disableEnableMother() {
    if (this.mother.status === true) {
      this.mother.status = false;
    } else {
      this.mother.status = true;
    }
    console.log(this.mother.status);

    this.motherService.update(this.mother).subscribe(
      success => {
        this.toastService.toastSuccess();
        this.getMothers();
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
