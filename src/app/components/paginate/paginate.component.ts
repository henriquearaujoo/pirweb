import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Paginate } from '../../models/paginate';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {

  private pages: any[] = Array();
  @Output() eventPage = new EventEmitter<number>();
  @Input() private paginate: Paginate;

  constructor() {
  }

  ngOnInit() {
    this.getPages();
  }

  getPages() {
    this.pages = [];
    for (let i = 1; i <= this.paginate.totalPages; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    this.eventPage.emit(page);
  }
}
