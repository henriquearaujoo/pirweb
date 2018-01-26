import { RestService } from './../rest/rest.service';
import { Injectable } from '@angular/core';
import { Constant } from '../../constant/constant';
import { Http } from '@angular/http';

@Injectable()
export class FileService extends RestService {

  apiurl = Constant.BASE_URL;

    constructor(public http: Http) {
        super(http);
    }

    public upload(mediaType: String, fileToUpload: any) {
        const input = new FormData();
        input.append('file', fileToUpload);
        console.log(this.apiurl + 'file/upload/' + mediaType);
        return this.http.post(this.apiurl + 'file/upload/' + mediaType, input);
    }

    public download(id: string) {
        return this.get(this.apiurl + 'file/download/' + id);
    }
}
