import { Chapter } from './../../models/chapter';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChapterItemComponent } from '../../components/chapter-item/chapter-item.component';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  mChapter: Chapter[] = new Array();

  constructor(private router: Router) { }

  ngOnInit() {
    for (let i = 0 ; i < 10 ; i++) {
      const t = new Chapter();
      t.description = 'description test:' + i;
      t.title = 'title test';
      t.content = 'content test';
      t.id = i + '';
      this.mChapter.push(t);
    }
  }

  createNewChapter() {
    this.router.navigate(['information']);
  }

}
