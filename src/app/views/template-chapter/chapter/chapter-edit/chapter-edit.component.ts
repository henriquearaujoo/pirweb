import { Component, OnInit } from '@angular/core';
import { Chapter } from '../../../../models/chapter';
import { Router } from '@angular/router';
import { ChapterService } from '../../../../services/chapter/chapter.service';
import { ToastService } from '../../../../services/toast-notification/toast.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-chapter-edit',
  templateUrl: './chapter-edit.component.html',
  styleUrls: ['./chapter-edit.component.css']
})
export class ChapterEditComponent implements OnInit {

  private chapter: Chapter = new Chapter();
  private estimated_time: number;

  constructor(
    private router: Router,
    private chapterService: ChapterService,
    private toastService: ToastService) {
  }

  ngOnInit() {
    this.chapter = this.chapterService.getChapter();
    if (this.chapter !== undefined) {
      this.estimated_time = this.chapter.estimated_time / 60000;
      console.log(this.chapter);
    }
  }

  editData() {
    // this.chapter.family_tasks = 'test family tasks';
    // this.chapter.estimated_time = this.estimated_time * 60000;
    // this.chapter.time_next_visit = 86400000;
    // this.chapterService.saveEditChapter(this.chapter).subscribe(
    //   success => {
    //     this.chapter = success;
    //     this.toastService.toastSuccess();
    //     this.router.navigate(['chapter-dashboard']);
    //   }
    // );
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
