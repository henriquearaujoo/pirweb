import { MultimediaPickerComponent } from './../../../../components/multimedia-picker/multimedia-picker.component';
import { Permissions, RuleState } from './../../../../helpers/permissions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chapter } from '../../../../models/chapter';
import { FileService } from '../../../../services/file/file.service';
import { ChapterService } from '../../../../services/chapter/chapter.service';
import { ToastService } from '../../../../services/toast-notification/toast.service';

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
  private type_file: any;
  private selectedFile: any;
  public chapter_id: string;
  private chapter: Chapter = new Chapter();

  @ViewChild('multimediaPicker')
  multimediaPicker: MultimediaPickerComponent;

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
      {'url': '../../../../../assets/pir.png'},
      {'url': '../../../../../assets/pir.png'},
      {'url': '../../../../../assets/pir.png'},
      {'url': '../../../../../assets/pir.png'},
      {'url': '../../../../../assets/pir.png'},
      {'url': '../../../../../assets/pir.png'},
      {'url': '../../../../../assets/pir.png'}
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
        console.log('CHAPTER MULTIMEDIA:', this.chapter);
        this.multimediaPicker.chapter = this.chapter;
      },
      e => {
        console.log('PirError:' + e);
      }
    );
  }

  upload(media) {
    this.media = media;
    this.chapter.media = null;

    // /UPDATE CHAPTERS
    console.log('MEDIA:', this.media);
    if (this.media && this.media.id) {
      this.chapter.media.push(this.media);
      console.log('CHAPTER MEDIA:', this.chapter.media);

      this.chapterService.update(this.chapter).subscribe(
        o => {
          this.toastService.toastSuccess();
          console.log(o);
          // this.cancel();
        },
        e => {
          console.log(e);
          this.toastService.toastError();
        }
      );
    }
  }

// tslint:disable-next-line:eofline
}