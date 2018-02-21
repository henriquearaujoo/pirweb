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

  constructor(
    private router: Router,
    private childService: ChildService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.hasdata = false;
    this.getChildren();
  }

  getChildren() {
    this.subscription = this.childService.getChildren().subscribe(
      success => {
        // this.paginate = success;
        // this.pregnants = this.paginate.content;
        this.children = success;
        this.hasdata = true;
      },
      error => console.log(error)
    );

  }
  setChild(child: Child) {
    localStorage.setItem('childId', child.id.toString());
    this.router.navigate(['child']);
  }

  changeStatus(child: Child) {
    this.child = child;
  }

  disableEnableChild() {
    if (this.child.status === true) {
      this.child.status = false;
    } else {
      this.child.status = true;
    }
    console.log(this.child.status);

    this.childService.update(this.child).subscribe(
      success => {
        this.toastService.toastSuccess();
        this.getChildren();
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
