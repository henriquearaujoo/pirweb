import { error } from 'util';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FileData } from '../../models/FileData';
import { Constant } from '../../constant/constant';
import { FileService } from '../../services/file/file.service';
import { v4 as uuid } from 'uuid';
import { Chapter } from '../../models/chapter';

@Component({
  selector: 'app-multimedia-picker',
  templateUrl: './multimedia-picker.component.html',
  styleUrls: ['./multimedia-picker.component.css']
})
export class MultimediaPickerComponent implements OnInit {

  private type_file: any[];
  private selectedType;
  public chapter: Chapter = new Chapter();

  @ViewChild('fileInput') fileInput;
  @Output() uploaded: EventEmitter<any> = new EventEmitter<any>();
  @Input() type = 0;
  _fileData: any;
  // _fileData.mediaType = this.selectedType.type;
  _mediaSrc: any;
  _isThumbnail: any = false;

  _mediaTypeId: any;

  @Input() canChangeType: any = true;

  @Input() set isThumbnail(val) {
    if (!this._fileData) {
      this._fileData = new FileData();

      this.clear();
    }

    if (this._isThumbnail = val) {
      if (this._fileData.mediaType !== Constant.MEDIA_TYPE.PICTURE_2D) {
        this._fileData.mediaType = Constant.MEDIA_TYPE.PICTURE_2D;

        this.clear();
      }
    }
  }

  @Input()
  set fileData(val: any) {
    this._fileData = val;

    if (!this._fileData) {
      this._fileData = new FileData();
    }

    this.reload();
  }

  get fileData(): any {
    if (!this._fileData) {
      this._fileData = new FileData();
    }

    return this._fileData;
  }

  constructor(private fileService: FileService) {
    this.type_file = [
      {
        'name': 'Imagem',
        'type': 'PICTURE2D',
        'size': 10318,
        'accept': 'image/png'
      },
      {
        'name': 'Vídeo',
        'type': 'VIDEO2D',
        'size': 50318,
        'accept': 'mp4'
        },
      {
        'name': 'PDF',
        'type': 'FILE',
        'size': 20318,
        'accept': 'pdf'
        }
    ];

  }

  ngOnInit() {
    console.log('CHAPTER MULTIMEDIA PICKER:', this.chapter);

    this._mediaTypeId = uuid();

    if (!this._fileData) {
      this._fileData = new FileData();
    }
  }

  reload() {
    if (this._fileData && this._fileData.id) {
      this._mediaSrc = Constant.BASE_URL + '/file/download/' + this._fileData.id;
    }

  }

  upload(): void {
    if (this._fileData && !this._fileData.mediaType) {
      return;
    }

    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.fileService.upload(this._fileData.mediaType, fileToUpload).subscribe(
        res => {
          console.log('_fileData1', res);
          this._fileData = JSON.parse(res.text());
          console.log('_fileData', JSON.parse(res.text()));

          // this.reload();

          if (this.uploaded) {
            this.uploaded.emit(this._fileData);
          }
        }, error => console.log('ERROR UPLOAD:', error)
      );
    }
  }

  loadInfo() {
    if ( this.type_file !== undefined) {
      for ( let i = 0; i < this.type_file.length; i++) {
        if ( this.type_file[i].type === this._fileData.mediaType) {
          this.selectedType = this.type_file[i];
        }
      }
    }
  }

  clear() {
    const mediaType = this._fileData.mediaType;
    this._fileData = { mediaType: mediaType };

    this._mediaSrc = null;
    this.loadInfo();

    if (this.uploaded) {
      this.uploaded.emit(this._fileData);
    }
  }

  verifyValidSubmitted(form, field) {
    return form.submitted && !field.valid;
  }

  applyCssError(form, field) {
    return {
      'has-error': this.verifyValidSubmitted(form, field),
      'has-feedback': this.verifyValidSubmitted(form, field)
    };
  }

}
