import { browser } from 'protractor';
import { ModalService } from './../../../../components/modal/modal.service';
import { Permissions, RuleState } from './../../../../helpers/permissions';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

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

    this.images = [
      {'path': '../../../../../assets/img_test/img1.jpg', 'type': 'PICTURE2D'},
      {'path': '../../../../../assets/img_test/itn.mp4', 'type': 'VIDEO2D'},
      {'path': '../../../../../assets/img_test/img2.jpg', 'type': 'PICTURE2D'},
      {'path': '../../../../../assets/img_test/img3.jpg', 'type': 'PICTURE2D'},
      {'path': '../../../../../assets/img_test/img4.jpg', 'type': 'PICTURE2D'},
      {'path': '../../../../../assets/img_test/itn.mp4', 'type': 'VIDEO2D'},
      {'path': '../../../../../assets/img_test/img5.jpg', 'type': 'PICTURE2D'},
      {'path': '../../../../../assets/img_test/img6.png', 'type': 'PICTURE2D'},
      {'path': '../../../../../assets/img_test/itn.mp4', 'type': 'VIDEO2D'},
      {'path': '../../../../../assets/img_test/itn.mp4', 'type': 'VIDEO2D'},
      {'path': '../../../../../assets/img_test/FAS.pdf', 'type': 'FILE'}
          ];

    // this.type_file = [
    //   {
    //     'id': 1,
    //     'type': 'image',
    //     'size': 10318,
    //     'accept': 'image/png'
    //   },
    //   {
    //     'id': 2,
    //     'type': 'video',
    //     'size': 10318,
    //     'accept': 'mp4'
    //     },
    //   {
    //     'id': 3,
    //     'type': 'pdf',
    //     'size': 10318,
    //     'accept': 'pdf'
    //     }
    // ];
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
        this.reload();
        this.isNewData = false;
        // this.multimedias = this.chapter.medias;
        // console.log('MULTIMEDIAs:', this.multimedias);
        //  for (let i = 0; i < this.multimedias.length; i++) {
        //     this.multimedias[i].path = Constant.BASE_URL + 'file/download/' + this.multimedias[i].id;
        // }
      },
      e => {
        console.log('PirError:' + e);
      }
    );
  }

  upload(media) {
    this.media = media;
    console.log('MEDIA ##', this.media);
    console.log('isNewData', this.isNewData);
    // if (this.media && this.media.id) {
      if (!this.isNewData) {
        this.media.path = Constant.BASE_URL + 'filetest/download/' + this.media.id;
        for (let i = 0; i < this.media.length; i++) {
          this.chapter.medias.push(this.media[i]);
        }
        console.log('CHAPTER:', this.chapter);
        this.chapter.thumbnails = [];
        this.chapterService.update(this.chapter).subscribe(
          s => {
            this.toastService.toastSuccess();
            this.chapter = s;
            console.log('UPDATE CHAPTER:', this.chapter);
            this.canReload = false;
            this.reload();
          },
          e => {
            console.log(e);
            this.toastService.toastError();
          }
        );
      }
    // }
  }

  reload() {
    this.multimedias = this.chapter.medias;
    console.log('Multimedias:', this.multimedias);
    for (let i = 0; i < this.multimedias.length; i++) {
      this.multimedias[i].path = Constant.BASE_URL + 'filetest/download/' + this.multimedias[i].id;
      if ( i === (this.multimedias.length - 1 )) {
        this.canReload = true;
      }
     }
  }

  removeMultimedia(item: any) {
    this.item_remove = item;
    this.openModalRemove.click();
  }

  confirmRemove() {
    console.log('REMOVE:', this.item_remove);
    // this.fileService.remove(this.item_remove.id).subscribe(
    //   success => {
    //     this.toastService.toastSuccess();
    //   },
    //   errror => {
    //     this.toastService.toastError();
    //   }
    // );
  }
// tslint:disable-next-line:eofline
}
