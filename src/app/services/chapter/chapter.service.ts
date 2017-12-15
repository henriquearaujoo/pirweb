import { Observable } from 'rxjs/Observable';
import { RestService } from './../rest/rest.service';
import { Injectable } from '@angular/core';
import { Constant } from '../../constant/constant';
import { Http } from '@angular/http';
import { Chapter } from '../../models/chapter';

@Injectable()
export class ChapterService extends RestService {

  private apiurl = Constant.BASE_URL + 'chapters/';
  private chapter: Chapter;
  private size: number;

  constructor(http: Http) {
    super(http);
    this.size = 2;
   }

<<<<<<< HEAD
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
=======
  public getChapters() {
    return this.get(this.apiurl);
>>>>>>> [RS_32] insert information
  }

  public select() {
    return this.get(this.apiurl);
  }

  public load(id: string) {
    return this.get(this.apiurl + id);
  }

  public insert(chapter: Chapter): Observable<Chapter> {
    return this.post(this.apiurl, chapter);
  }

  public update(chapter: Chapter): Observable<Chapter> {
    return this.put(this.apiurl, chapter);
  }

  public setChapter(chapter: Chapter) {
    this.chapter = chapter;
  }

  public getChapter() {
    return this.chapter;
  }
}
