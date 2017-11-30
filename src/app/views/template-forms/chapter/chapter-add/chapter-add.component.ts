import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter-add',
  templateUrl: './chapter-add.component.html',
  styleUrls: ['./chapter-add.component.css']
})
export class ChapterAddComponent implements OnInit {

  imgSource: string;

  constructor( private router: Router) {
    this.imgSource = 'https://avatars2.githubusercontent.com/u/139426?s=400&v=4';
  }

  ngOnInit() {
  }

  addChapterInformation() {
    // location.reload();
    this.router.navigate(['/chapterInformation']);
  }

  addReception() {
    // location.reload();
    this.router.navigate(['/reception']);
  }

  addIntervention() {
    // location.reload();
    this.router.navigate(['/intervention']);
  }

  addTask() {
    // location.reload();
    this.router.navigate(['/task']);
  }
}
