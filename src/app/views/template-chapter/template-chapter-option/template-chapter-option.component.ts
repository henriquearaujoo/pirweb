import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-option-card',
  templateUrl: './template-chapter-option.component.html',
  styleUrls: ['./template-chapter-option.component.css']
})
export class TemplateChapterOptionComponent implements OnInit {

  imgSource: string;

  constructor( private router: Router) {
    this.imgSource = 'https://avatars2.githubusercontent.com/u/139426?s=400&v=4';
  }

  ngOnInit() {
  }

  goToReception() {
    // location.reload();
     this.router.navigate(['/reception']);
  }

  gotToIntervention() {
    // location.reload();
    this.router.navigate(['/intervention']);
  }

  goToTask() {
   // location.reload();
    this.router.navigate(['/task']);
  }

  goToCollectData() {
    this.router.navigate(['/collect-data']);
  }
}
