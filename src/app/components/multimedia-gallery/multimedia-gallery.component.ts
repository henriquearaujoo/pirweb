import { ModalService } from './../modal/modal.service';
import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { Constant } from '../../constant/constant';
import { PageService } from '../../services/pagenate/page.service';
import { PagenateComponent } from '../pagenate/pagenate.component';

declare function require(name: string): any;

@Component({
  selector: 'app-multimedia-gallery',
  templateUrl: './multimedia-gallery.component.html',
  styleUrls: ['./multimedia-gallery.component.css']
})
export class MultimediaGalleryComponent implements OnInit {

  @Input() datasource: any[];
  private selectedItem: any;
  @Output() remove = new EventEmitter<any>();

   // array of all items to be paged
   private allItems: any[];
   private images: any[];
   private videos: any[];
   private files: any[];

   // pager object
   pager: any = {};

   // paged items
   pagedItems: any[];

  constructor(
    private modalService: ModalService,
    private pagerService: PageService ) {
     }

  ngOnInit() {
    // if (this.datasource) {
    //   console.log('Datasource:', this.datasource);
    //   for (let i = 0; i < this.datasource.length; i++) {
    //     if (this.datasource[i].type === 'PICTURE2D') {
    //       this.images = this.datasource[i];
    //       continue;
    //     }
    //     if (this.datasource[i].type === 'VIDEO2D') {
    //       this.videos = this.datasource[i];
    //       continue;
    //     }
    //     if (this.datasource[i].type === 'FILE') {
    //       this.files = this.datasource[i];
    //     }
    //   }
    //   this.allItems = this.datasource;
    //   this.setPage(1);
    // }
    // if ( this.images.length > 0) {
    //   this.setPageImages(1);
    // }
  }

  setSelectedItem(item: any) {
    this.selectedItem = item;
    console.log('selectedItem', this.selectedItem);
 }

 removeMultimedia(item: any) {
  this.remove.emit(item);
 }

 setPage(page: number) {
  if (page < 1 || page > this.pager.totalPages) {
      return;
  }
  // get pager object from service
  this.pager = this.pagerService.getPager(this.allItems.length, page);

  // get current page of items
  this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

setPageImages(page: number) {
  if (page < 1 || page > this.pager.totalPages) {
      return;
  }
  // get pager object from service
  this.pager = this.pagerService.getPager(this.images.length, page);

  // get current page of items
  this.pagedItems = this.images.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

 navigate(forward) {
  const index = this.datasource.indexOf(this.selectedItem) + (forward ? 1 : -1);
  if (index >= 0 && index < this.datasource.length) {
     this.selectedItem = this.datasource[index];
  }
}

}
