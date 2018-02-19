import { ToastService } from './../../../services/toast-notification/toast.service';
import { PregnantService } from './../../../services/pregnant/pregnant.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Paginate } from './../../../models/paginate';
import { Pregnant } from './../../../models/pregnant';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pregnant-list',
  templateUrl: './pregnant-list.component.html',
  styleUrls: ['./pregnant-list.component.css']
})
export class PregnantListComponent implements OnInit, OnDestroy {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private pregnant: Pregnant = new Pregnant();
  private pregnants: Pregnant[] = new Array();
  private paginate: Paginate = new Paginate();
  private subscription: Subscription;
  private hasdata: boolean;
  private filter: any = { name: ''};
  private page: number;

  constructor(
    private router: Router,
    private pregnantService: PregnantService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.hasdata = false;
    this.getPregnats();
  }

  getPregnats() {
    this.subscription = this.pregnantService.getPregnant().subscribe(
      success => {
        // this.paginate = success;
        // this.pregnants = this.paginate.content;
        this.pregnants = success;
        this.hasdata = true;
      },
      error => console.log(error)
    );

  }
  setPregnant(pregnant: Pregnant) {
    localStorage.setItem('pregnantId', pregnant.id.toString());
    this.router.navigate(['pregnant']);
  }

  changeStatus(pregnant: Pregnant) {
    this.pregnant = pregnant;
  }

  disableEnablePregnant() {
    if (this.pregnant.status === true) {
      this.pregnant.status = false;
    } else {
      this.pregnant.status = true;
    }
    console.log(this.pregnant.status);

    this.pregnantService.update(this.pregnant).subscribe(
      success => {
        this.toastService.toastSuccess();
        this.getPregnats();
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
