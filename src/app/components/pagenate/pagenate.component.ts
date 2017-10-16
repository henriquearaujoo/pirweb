import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';

import { PageService } from '../../services/pagenate/page.service';

@Component({
  selector: 'app-pagenate',
  templateUrl: './pagenate.component.html',
  styleUrls: ['./pagenate.component.css']
})
export class PagenateComponent implements OnInit {
  constructor(private pageService: PageService) { }

  allItems: any[];
  pager: any = {};
  pagedItems: any[];

  ngOnInit() {}

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pageService.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
