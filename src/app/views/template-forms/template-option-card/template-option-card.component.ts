import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-option-card',
  templateUrl: './template-option-card.component.html',
  styleUrls: ['./template-option-card.component.css']
})
export class TemplateOptionCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToChapterInformation() {
    this.router.navigate(['chapterInformation']);
  }

  goToReception() {
    this.router.navigate(['reception']);
  }

  goToTask() {
    this.router.navigate(['task']);
  }

  goToCreateForm() {
    this.router.navigate(['createForm']);
  }
}
