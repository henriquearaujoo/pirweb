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

  private loading: boolean;
  private sending: boolean;
  private dragging: boolean;

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
        'type': 'IMAGE',
        'size': 1e+7,
        'accept': 'image/png, image/jpeg',
        'types': 'PNG e JPEG',
        'size_show': '10MB'
      },
      {
        'name': 'Vídeo',
        'type': 'VIDEO',
        'size': 5e+7,
        'accept': 'video/mp4',
        'types': 'MP4',
        'size_show': '50MB'
        },
      {
        'name': 'PDF',
        'type': 'FILE',
        'size': 1e+7,
        'accept': 'application/pdf',
        'types': 'PDF',
        'size_show': '10MB'
        }
    ];

  }

  ngOnInit() {
    this._mediaTypeId = uuid();

    if (!this._fileData) {
      this._fileData = new FileData();
    }
    this.selectedType = '';
    this.loading = false;
    this.sending = false;

    window.addEventListener('dragover', e => {
      if (!this.isNewData && this.selectedType !== '') {
        this.dragging = true;
      }
      if ((<Element>e.target).tagName  !== 'INPUT') {
        e.preventDefault();
      }
    }, false);
    window.addEventListener('drop', e => {
      if ((<Element>e.target).tagName  !== 'INPUT') {
        e.preventDefault();
      }
      this.dragging = false;
    }, false);

    window.addEventListener('mouseup', e => {
      this.dragging = false;
    }, false);

  }

  onChange(files) {
   // this.loading = true;
    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files.length > 0) {
      for (let i = 0 ; i < fi.files.length ; i ++ ) {
        this.loading = true;
        const fileToUpload = fi.files[i];
        if ( (this.selectedType.accept.includes(fileToUpload.type) && (fileToUpload.type !== '')) ) {
          if ( fileToUpload.size <= this.selectedType.size) {
            this.files.push(fileToUpload);
            this.hasFile = true;
            this.loading = false;
          } else {
            this.toastService.toastMsgError('Erro', 'Não foi possível carregar o arquivo ' + fileToUpload.name +
            '. Verifique o tamanho máximo permitido para o tipo de mídia selecionado');
            this.reset();
            this.loading = false;
          }
        } else {
          this.toastService.toastMsgError('Erro', 'Não foi possível carregar o arquivo ' + fileToUpload.name +
            '. Verifique as extensões permitidas para o tipo de mídia selecionado');
            this.reset();
            this.loading = false;
        }
      }
    }
  }
  remove(file) {
    this.files.splice(file, 1);
    this.reset();
    if (this.files.length === 0) {
      this.hasFile = false;
    }
  }

  reset() {
    this.fileInput.nativeElement.value = '';
  }

  upload(): void {
    this.sending = true;
    if (this._fileData && !this._fileData.mediaType) {
      return;
    }

    if ( this.files.length > 0) {
      if (this.files && this.files.length > 0) {
        for (let i = 0 ; i < this.files.length ; i ++ ) {
          const fileToUpload = this.files[i];
          this.fileService.upload(fileToUpload).subscribe(
          res => {
            this._fileData = JSON.parse(res.text());

            this.files = [];
            this.hasFile = false;
            this.sending = false;
            if (this.uploaded) {
              this.uploaded.emit(this._fileData);
              this.selectedType = '';
              this.reset();
              // this._fileData = null;
            }
          }, error => {
            console.log('ERROR UPLOAD:', error);
            this.sending = false;
          }
        );
        }
      }
    } else {
      this.sending = false;
      this.toastService.toastMsgWarn('Atenção', 'Selecione um ou mais arquivos para upload!');
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
