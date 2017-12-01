import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-option-card',
  templateUrl: './template-option-card.component.html',
  styleUrls: ['./template-option-card.component.css']
})
export class TemplateOptionCardComponent implements OnInit {

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

  goToCreateForm() {

  }
}
