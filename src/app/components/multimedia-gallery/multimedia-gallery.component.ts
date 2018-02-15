import { FileService } from './../../services/file/file.service';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ModalService } from './../modal/modal.service';
import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, EventEmitter, Output, OnChanges } from '@angular/core';
import { Constant } from '../../constant/constant';
import { PageService } from '../../services/pagenate/page.service';
import { PagenateComponent } from '../pagenate/pagenate.component';
import 'rxjs/Rx' ;
import { saveAs } from 'file-saver/FileSaver';

declare function require(name: string): any;

@Component({
  selector: 'app-multimedia-gallery',
  templateUrl: './multimedia-gallery.component.html',
  styleUrls: ['./multimedia-gallery.component.css']
})
export class MultimediaGalleryComponent implements OnInit, OnChanges {

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
    private pagerService: PageService,
    private fileService: FileService) {
     }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.datasource) {
      this.reload();
    }
  }

  ngOnInit() {
    // if (this.datasource) {
    //   console.log('Datasource:', this.datasource);
    //   this.reload();
    // }
  }

  setSelectedItem(item: any) {
    this.selectedItem = item;
 }

  downloadFile(item: any) {
    this.fileService.donwload(item.id).subscribe(
      data =>  {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        // window.open(url);
        saveAs(blob, item.name);

      },
      error => console.log('Error downloading the file.')
      );
  }

 reload() {
  for (let i = 0; i < this.datasource.length; i++) {
    this.datasource[i].path = Constant.BASE_URL + 'file/download/' + this.datasource[i].id;
   }
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
/* download to zip
getZip(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
 let headers = this.setHeaders({
      'Content-Type': 'application/zip',
      'Accept': 'application/zip'
    });

 return this.http.get(`${environment.apiUrl}${path}`, {
   headers: headers,
   search: params,
   responseType: ResponseContentType.ArrayBuffer //magic
 })
          .catch(this.formatErrors)
          .map((res:Response) => res['_body']);
}
*/
}
