import { ToastService } from './../../services/toast-notification/toast.service';
import { error } from 'util';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FileData } from '../../models/FileData';
import { Constant } from '../../constant/constant';
import { FileService } from '../../services/file/file.service';
import { v4 as uuid } from 'uuid';
import { Chapter } from '../../models/chapter';

@Component({
  selector: 'app-upload-multimedia',
  templateUrl: './upload-multimedia.component.html',
  styleUrls: ['./upload-multimedia.component.css']
})
export class UploadMultimediaComponent implements OnInit {

  private type_file: any[];
  private selectedType;
  public chapter: Chapter = new Chapter();

  private files: any[] = new Array();
  private hasFile = false;
  @ViewChild('fileInput') fileInput;
  @Output() uploaded: EventEmitter<any> = new EventEmitter<any>();
  _fileData: any;

  _mediaTypeId: any;

  @Input() canChangeType: any = true;
  @Input() isNewData: boolean;

  @Input()
  set fileData(val: any) {
    this._fileData = val;

    if (!this._fileData) {
      this._fileData = new FileData();
    }

  }

  get fileData(): any {
    if (!this._fileData) {
      this._fileData = new FileData();
    }

    return this._fileData;
  }

  constructor(
    private fileService: FileService,
    private toastService: ToastService) {
    this.type_file = [
      {
        'name': 'Imagem',
        'type': 'PICTURE2D',
        'size': 10318,
        'accept': 'image/png, image/jpeg'
      },
      {
        'name': 'Vídeo',
        'type': 'VIDEO2D',
        'size': 50318,
        'accept': 'video/mp4'
        },
      {
        'name': 'PDF',
        'type': 'FILE',
        'size': 20318,
        'accept': 'application/pdf'
        }
    ];

  }

  ngOnInit() {
    console.log('CHAPTER MULTIMEDIA PICKER:', this.chapter);

    this._mediaTypeId = uuid();

    if (!this._fileData) {
      this._fileData = new FileData();
    }
    this.selectedType = '';
  }

  onChange(files) {
    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files.length > 0) {
      for (let i = 0 ; i < fi.files.length ; i ++ ) {
        const fileToUpload = fi.files[i];
        if ( this.selectedType.accept.includes(fileToUpload.type) ) {
          this.files.push(fileToUpload);
          console.log('FILE1:', this.files);
          this.hasFile = true;
        } else {
          this.toastService.toastMsgError('Erro', 'Não foi possível carregar o arquivo ' + fileToUpload.name +
            '. Verifique as extensões permitidas para o tipo de mídia selecionado');
        }
      }
    }
  }
  remove(file) {
    this.files.splice(file, 1);
    if (this.files.length === 0) {
      this.hasFile = false;
    }
  }

  upload(): void {
    if (this._fileData && !this._fileData.mediaType) {
      return;
    }

    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files.length > 0) {
      for (let i = 0 ; i < fi.files.length ; i ++ ) {
        const fileToUpload = fi.files[i];
        this.fileService.upload(this._fileData.mediaType, fileToUpload).subscribe(
        res => {
          this._fileData = JSON.parse(res.text());
          console.log('_fileData', JSON.parse(res.text()));

          this.files = [];
          this.hasFile = false;

          if (this.uploaded) {
            this.uploaded.emit(this._fileData);
            this.selectedType = '';
          }
        }, error => console.log('ERROR UPLOAD:', error)
      );
      }
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
