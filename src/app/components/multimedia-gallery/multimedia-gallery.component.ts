import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    console.log('Datasource:', this.datasource);
  }

  setSelectedItem(item: any) {
    this.selectedItem = item;
    console.log('selectedItem', this.selectedItem);
 }

 navigate(forward) {
  const index = this.datasource.indexOf(this.selectedItem) + (forward ? 1 : -1);
  if (index >= 0 && index < this.datasource.length) {
     this.selectedItem = this.datasource[index];
  }
}

}
