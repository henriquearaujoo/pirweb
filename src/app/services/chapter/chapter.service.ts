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
  private size: number;

  constructor(http: Http) {
    super(http);
    this.size = 2;
   }

  public getChapters(param?: number, size?: number) {
    if (param === undefined) {
      const currentUrl = this.apiurl + 'chapters/search/page/?size=' + size;
      return this.get(currentUrl);
    }
    return this.get(this.apiurl + 'chapters/search/page/?size=' + size + '&number=' + param);
  }

  public getChapterStatus(param?: number, status?: boolean, size?: number) {
    if (status === undefined) {
      const currentUrl = this.apiurl + 'chapters/search/page/?size=' + size;
      return this.get(currentUrl);
    }
    return this.get(this.apiurl + 'chapters/search/page/?size=' + size + '&status=' + status + '&number=' + param);
  }

  public saveChapter(chapter: Chapter): Observable<Chapter> {
    const saveChapterUrl = this.apiurl + 'chapters/';
    return this.post(saveChapterUrl, chapter);
  }

  public saveEditChapter(chapter: Chapter): Observable<Chapter> {
    const saveChapterUrl = this.apiurl + 'chapters/';
    return this.put(saveChapterUrl, chapter);
  }

  public setChapter(chapter: Chapter) {
    this.chapter = chapter;
  }

  public getChapter() {
    return this.chapter;
  }
}
