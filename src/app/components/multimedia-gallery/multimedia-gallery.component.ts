import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Constant } from '../../constant/constant';

declare function require(name: string): any;

@Component({
  selector: 'app-multimedia-gallery',
  templateUrl: './multimedia-gallery.component.html',
  styleUrls: ['./multimedia-gallery.component.css']
})
export class MultimediaGalleryComponent implements OnInit {

  @Input() imageList: any[];
  private selectedImage: any;

  // elementResizeEvent = require('element-resize-event');

  _hasClick: boolean;

  _mediaType: any;
  _mediaSrc: any;

  // @ViewChild('mainscreen') mainscreen: ElementRef;
  // @ViewChild('videoplayer') videoplayer: any;

  viewHeight: number;
  viewWidth: number;

  @Input() set fileData(val) {
    if (val === undefined) {
      return;
    }

    if (!val) {
      this._mediaType = null;
      this._mediaSrc = null;
      this.reload();
      return;
    }

    this._mediaType = val.mediaType;
    this._mediaSrc = Constant.BASE_URL + 'file/download/' + val.id;
    this.reload();
  }

  @Input()
  set mediaType(val) {
    this._mediaType = val;
    this.reload();
  }

  get mediaType(): any {
    return this._mediaType;
  }

  @Input()
  set mediaSrc(val) {
    this._mediaSrc = val;
    this.reload();
  }

  get mediaSrc(): any {
    return this._mediaSrc;
  }

  constructor() { }

  ngOnInit() {
    this.calcAdjustedHeight();

    // this.elementResizeEvent(this.mainscreen.nativeElement, function () {
    //   this.calcAdjustedHeight();
    // }.bind(this));
    // this.elementResizeEvent(this.mainscreen.nativeElement.parentNode, function () {
    //   this.calcAdjustedHeight();
    // }.bind(this));
    // this.elementResizeEvent(this.mainscreen.nativeElement.parentNode.parentNode, function () {
    //   this.calcAdjustedHeight();
    // }.bind(this));
  }

  setSelectedImage(image: any) {
    this.selectedImage = image;
 }

 reload() {

  // if (this._mediaType === Constant.MEDIA_TYPE.VIDEO_2D && this.videoplayer && this.videoplayer.nativeElement) {
  //   this.videoplayer.nativeElement.load();
  //   this._hasClick = false;
  // }

  setTimeout(() => this.calcAdjustedHeight(), 100);
}

calcAdjustedHeight() {
  // 1280/720
  // this.viewWidth = Math.max(this.mainscreen.nativeElement.clientWidth,
  //   this.mainscreen.nativeElement.parentNode.clientWidth,
  //   this.mainscreen.nativeElement.parentNode.parentNode.clientWidth);
  // this.viewHeight = Math.min((this.viewWidth * 720) / 1280, 720);
}

@HostListener('window:resize', ['$event'])
onResize(event) {
  this.calcAdjustedHeight();

  // if(this._mediaType === Constant.MEDIA_TYPE.VIDEO_2D && this.videoplayer) {
  //   this.videoplayer.nativeElement.height(this.viewWidth);
  //   this.videoplayer.nativeElement.width(this.viewHeight);
  // }
}

toggleVideo() {
  // if (!this._hasClick) {
  //   this.videoplayer.nativeElement.webkitRequestFullScreen();
  //   this.videoplayer.nativeElement.play();
  // } else if (!this.videoplayer.nativeElement.paused) {
  //   this.videoplayer.nativeElement.pause();
  // } else {
  //   this.videoplayer.nativeElement.play();
  // }

  this._hasClick = true;
}


}
