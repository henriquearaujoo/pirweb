import { Observable } from 'rxjs/Observable';
import { RestService } from './../rest/rest.service';
import { Injectable } from '@angular/core';
import { Constant } from '../../constant/constant';
import { Http } from '@angular/http';
import { Chapter } from '../../models/chapter';

@Injectable()
export class ChapterService extends RestService {

  apiurl = Constant.BASE_URL;
  private chapter: Chapter;

  constructor(http: Http) {
    super(http);
   }

  public getChapters() {
    const currentUrl = this.apiurl + 'chapters/';
    return this.get(currentUrl);
  }

  public saveChapter(chapter: Chapter): Observable<Chapter> {
    const saveChapterUrl = this.apiurl + 'chapters/';
    return this.post(saveChapterUrl, chapter);
  }

  public setChapter(chapter: Chapter) {
    this.chapter = chapter;
  }

  public getChapter() {
    return this.chapter;
  }
}
