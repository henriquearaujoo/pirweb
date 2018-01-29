import { Permissions, RuleState } from './../../../../helpers/permissions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chapter } from '../../../../models/chapter';
import { FileService } from '../../../../services/file/file.service';
import { ChapterService } from '../../../../services/chapter/chapter.service';
import { ToastService } from '../../../../services/toast-notification/toast.service';
import { Constant } from '../../../../constant/constant';

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
  private multimedias: any;
  private type_file: any;
  private selectedFile: any;
  public chapter_id: string;
  private chapter: Chapter = new Chapter();
  public isNewData: boolean;

  media: any = {};
  thumbnail: any = {};

  constructor(
    private permissions: Permissions,
    private chapterService: ChapterService,
    private toastService: ToastService) {
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

    this.type_file = [
      {
        'id': 1,
        'type': 'image',
        'size': 10318,
        'accept': 'image/png'
      },
      {
        'id': 2,
        'type': 'video',
        'size': 10318,
        'accept': 'mp4'
        },
      {
        'id': 3,
        'type': 'pdf',
        'size': 10318,
        'accept': 'pdf'
        }
    ];
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
  }

  fileChanged(e: Event) {
    console.log(e);
    }

  load(chapter) {
    this.chapterService.load(chapter).subscribe(
      success => {
        this.chapter = success;
        this.reload();
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
    if (this.media && this.media.id) {
      if (!this.isNewData) {
        this.chapter.medias.push(this.media);
        console.log('CHAPTER:', this.chapter);
        this.chapter.thumbnails = [];
        this.chapterService.update(this.chapter).subscribe(
          s => {
            this.toastService.toastSuccess();
            this.chapter = s;
            this.reload();
            console.log('UPDATE CHAPTER:', this.chapter);
          },
          e => {
            console.log(e);
            this.toastService.toastError();
          }
        );
      }
    }
  }

  reload() {
    this.multimedias = this.chapter.medias;
    console.log('MULTIMEDIAs:', this.multimedias);
    for (let i = 0; i < this.multimedias.length; i++) {
      this.multimedias[i].path = Constant.BASE_URL + 'file/download/' + this.multimedias[i].id;
     }
  }
// tslint:disable-next-line:eofline
}