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

  public getChapters(param?: number, size?: number) {
    if (param === undefined) {
      return this.get(this.apiurl + 'search/page/?size=' + size + '&sort=chapter,asc');
    }
    return this.get(this.apiurl + 'search/page/?size=' + size + '&number=' + param + '&sort=chapter,asc');
  }

  public getChapterStatus(param?: number, status?: boolean, size?: number) {
    if (status === undefined) {
      return this.get(this.apiurl + 'search/page/?size=' + size + '&sort=chapter,asc');
    }
    return this.get(this.apiurl + 'search/page/?size=' + size + '&status=' + status + '&number=' + param + '&sort=chapter,asc');
  }

  public getChaptersWithParam(param?: number) {
    if (param === undefined) {
      return this.get(this.apiurl + 'search/page/?sort=chapter,asc');
    }
    return this.get(this.apiurl + 'search/page/?number=' + param + '&sort=chapter,asc');
  }

  public loadVersionFromChapter(number: number, version: number) {
    return this.get(this.apiurl + 'search?number=' + version + '&version= ' + version);
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

  public getVersionFromChapter(id: number) {
    return this.get(this.apiurl + 'search/?number=' + id);
  }
}
