import { Paginate } from './../../models/paginate';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit, OnChanges {

  private pages: any[] = Array();
  @Output() eventPage = new EventEmitter<number>();
  @Input()  paginate: Paginate;

  constructor() {
  }

  ngOnInit() {
    this.getPages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.paginate) {
      this.getPages();
    }

  }

  getPages() {
    this.pages = [];
    if (this.paginate !== undefined) {
      for (let i = 1; i <= this.paginate.totalPages; i++) {
        this.pages.push(i);
      }
    }
  }

  setPage(page: number) {
    this.eventPage.emit(page);
  }
}
