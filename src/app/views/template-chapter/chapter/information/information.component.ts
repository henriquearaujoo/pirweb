import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import { Chapter } from '../../../../models/chapter';
import { ChapterService } from '../../../../services/chapter/chapter.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  private chapter: Chapter = new Chapter();
  private estimated_time: number;
  private isQuering = true;

  constructor(
    private router: Router,
    private chapterService: ChapterService) {
  }

  ngOnInit() {
    this.getNextChapterNumber();
  }

  getNextChapterNumber() {
    return this.chapterService.select();
  }

  public saveData(isNewData: boolean): Observable<Chapter> {
    if ( isNewData ) {
      return this.chapterService.insert(this.chapter);
    }else {
      return this.chapterService.update(this.chapter);
    }
  }

  public load(id: string): Observable<Chapter> {
   return  this.chapterService.load(id);
  }
  public loadForm(c: Chapter) {
    this.chapter = c;
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
