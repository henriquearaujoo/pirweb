import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from '../../../../models/chapter';
import { ChapterService } from '../../../../services/chapter/chapter.service';

@Component({
  selector: 'app-chapter-details',
  templateUrl: './chapter-details.component.html',
  styleUrls: ['./chapter-details.component.css']
})
export class ChapterDetailsComponent implements OnInit {

  private chapter: Chapter;
  private estimated_time: number;

  constructor(
    private router: Router,
    private chapterService: ChapterService,
  ) { }

  ngOnInit() {
    this.chapter = this.chapterService.getChapter();
    if (this.chapter !== undefined) {
      this.estimated_time = this.chapter.estimated_time / 60000;
      console.log(this.chapter);
    }
  }

}
