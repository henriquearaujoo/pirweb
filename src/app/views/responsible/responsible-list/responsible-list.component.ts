import { ToastService } from './../../../services/toast-notification/toast.service';
import { ResponsibleService } from './../../../services/responsible/responsible.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Paginate } from './../../../models/paginate';
import { ResponsibleChild } from './../../../models/responsible-child';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-responsible-list',
  templateUrl: './responsible-list.component.html',
  styleUrls: ['./responsible-list.component.css']
})
export class ResponsibleListComponent implements OnInit, OnDestroy {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private responsible: ResponsibleChild = new ResponsibleChild();
  private responsibleList: ResponsibleChild[] = new Array();
  private paginate: Paginate = new Paginate();
  private subscription: Subscription;
  private hasdata: boolean;
  private filter: any = { name: ''};
  private page: number;

  constructor(
    private router: Router,
    private responsibleService: ResponsibleService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.hasdata = false;
    this.getResponsible();
  }

  getResponsible() {
    this.subscription = this.responsibleService.getResponsible().subscribe(
      success => {
        // this.paginate = success;
        // this.pregnants = this.paginate.content;
        this.responsibleList = success;
        this.hasdata = true;
      },
      error => console.log(error)
    );

  }
  setResponsible(responsible: ResponsibleChild) {
    localStorage.setItem('responsibleId', responsible.id.toString());
    this.router.navigate(['responsible']);
  }

  changeStatus(responsible: ResponsibleChild) {
    this.responsible = responsible;
  }

  disableEnableResponsible() {
    if (this.responsible.status === true) {
      this.responsible.status = false;
    } else {
      this.responsible.status = true;
    }
    console.log(this.responsible.status);

    this.responsibleService.update(this.responsible).subscribe(
      success => {
        this.toastService.toastSuccess();
        this.getResponsible();
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
