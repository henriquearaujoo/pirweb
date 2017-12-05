import { Chapter } from './../../models/chapter';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapter-item',
  templateUrl: './chapter-item.component.html',
  styleUrls: ['./chapter-item.component.css']
})

export class ChapterItemComponent implements OnInit {

  @Input() chapter: Chapter;

  id: number;
  title: string;
  describe: string;
  subdescribe: string;
  imgSource: string;

  constructor() {
    this.imgSource = 'https://avatars2.githubusercontent.com/u/139426?s=400&v=4';
  }

  ngOnInit() {
    this.id = this.chapter.id;
    this.title = this.chapter.title;
    this.describe = this.chapter.description;
    }

    public updateTemplate() {
      console.log(this.id);
    }

    public removeTemplate() {
      console.log(this.id);
    }
}
