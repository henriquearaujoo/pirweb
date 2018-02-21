import { MultimediaGalleryComponent } from './../../../../components/multimedia-gallery/multimedia-gallery.component';
import { ModalService } from './../../../../components/modal/modal.service';
import { Permissions, RuleState } from './../../../../helpers/permissions';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Chapter } from '../../../../models/chapter';
import { FileService } from '../../../../services/file/file.service';
import { ChapterService } from '../../../../services/chapter/chapter.service';
import { ToastService } from '../../../../services/toast-notification/toast.service';
import { Constant } from '../../../../constant/constant';
import { LoaderService } from '../../../../services/loader/loader.service';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css']
})
export class MultimediaComponent implements OnInit {
  [x: string]: any;
  @Output() cancelEvent = new EventEmitter();
  private btn_cancel: boolean;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private hasData = false;
  private images: any;
  private multimedias: any[];
  private medias: any;
  private type_file: any;
  private selectedFile: any;
  public chapter_id: string;
  private chapter: Chapter = new Chapter();
  public isNewData: boolean;
  private openModalRemove: HTMLButtonElement;
  private item_remove: any;
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private canReload: boolean;
  @ViewChild('gallery') gallery: MultimediaGalleryComponent;

  media: any = {};
  thumbnail: any = {};

  constructor(
    private permissions: Permissions,
    private chapterService: ChapterService,
    private toastService: ToastService,
    private modalService: ModalService,
    private loaderService: LoaderService,
    private fileService: FileService) {
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;

    // this.images = [
    //   {'path': '../../../../../assets/img_test/img1.jpg', 'type': 'PICTURE2D'},
    //   {'path': '../../../../../assets/img_test/itn.mp4', 'type': 'VIDEO2D'},
    //   {'path': '../../../../../assets/img_test/img2.jpg', 'type': 'PICTURE2D'},
    //   {'path': '../../../../../assets/img_test/img3.jpg', 'type': 'PICTURE2D'},
    //   {'path': '../../../../../assets/img_test/img4.jpg', 'type': 'PICTURE2D'},
    //   {'path': '../../../../../assets/img_test/itn.mp4', 'type': 'VIDEO2D'},
    //   {'path': '../../../../../assets/img_test/img5.jpg', 'type': 'PICTURE2D'},
    //   {'path': '../../../../../assets/img_test/img6.png', 'type': 'PICTURE2D'},
    //   {'path': '../../../../../assets/img_test/itn.mp4', 'type': 'VIDEO2D'},
    //   {'path': '../../../../../assets/img_test/itn.mp4', 'type': 'VIDEO2D'},
    //   {'path': '../../../../../assets/img_test/FAS.pdf', 'type': 'FILE'}
    //       ];
   }

  ngOnInit() {
    this.permissions.canActivate('/chapter-dashboard');
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );

    this.openModalRemove = (<HTMLButtonElement>document.getElementById('openModalRemove'));
    this.openModalRemove.style.display = 'none';
  }

  fileChanged(e: Event) {
    console.log(e);
    }

  load(chapter) {
    this.chapterService.load(chapter).subscribe(
      success => {
        this.chapter = success;
        this.isNewData = false;
        this.multimedias = this.chapter.medias;
        this.hasData = true;
      },
      e => {
        console.log('PirError:' + e);
      }
    );
  }

  uploadMedia(media) {
    if (this.btn_cancel) {
      this.btn_cancel = false;
      return false;
    }
    // this.media = media;
    console.log('MEDIA ##', media);
    console.log('isNewData', this.isNewData);
    // if (this.media && this.media.id) {
      if (!this.isNewData) {
        // this.media.path = Constant.BASE_URL + 'filetest/download/' + this.media.id;
        for (let i = 0; i < media.length; i++) {
          this.chapter.medias.push(media[i]);
        }
        console.log('CHAPTER:', this.chapter);
        this.chapter.thumbnails = [];
        this.chapterService.update(this.chapter).subscribe(
          s => {
            this.toastService.toastSuccess();
            this.chapter = s;
            // this.multimedias = this.chapter.medias;
            console.log('UPDATE CHAPTER:', this.chapter);
            this.load(this.chapter.id);
            // this.gallery.reload();
          },
          e => {
            console.log(e);
            this.toastService.toastError();
          }
        );
      }
    // }
  }

  // reload() {
  //   this.multimedias = this.chapter.medias;
  //   for (let i = 0; i < this.multimedias.length; i++) {
  //     this.multimedias[i].path = Constant.BASE_URL + 'filetest/download/' + this.multimedias[i].id;
  //     if ( i === (this.multimedias.length - 1 )) {
  //       this.canReload = true;
  //     }
  //    }
  // }

  removeMultimedia(item: any) {
    this.item_remove = item;
    this.openModalRemove.click();
  }

  confirmRemove() {
    console.log('REMOVE:', this.item_remove);
    this.fileService.remove(this.item_remove.id).subscribe(
      success => {
        this.toastService.toastSuccess();
        this.load(this.chapter.id);
      },
      errror => {
        this.toastService.toastError();
      }
    );
  }

  onCancel() {
    this.cancelEvent.emit();
    this.btn_cancel = true;
  }
// tslint:disable-next-line:eofline
}
