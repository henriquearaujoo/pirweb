import { ModalService } from './../modal/modal.service';
import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { Constant } from '../../constant/constant';

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
  constructor( private modalService: ModalService ) { }

  ngOnInit() {
    console.log('Datasource:', this.datasource);
  }

  setSelectedItem(item: any) {
    this.selectedItem = item;
    console.log('selectedItem', this.selectedItem);
 }

 removeMultimedia(item: any) {
  this.remove.emit(item);
 }

 navigate(forward) {
  const index = this.datasource.indexOf(this.selectedItem) + (forward ? 1 : -1);
  if (index >= 0 && index < this.datasource.length) {
     this.selectedItem = this.datasource[index];
  }
}

}
