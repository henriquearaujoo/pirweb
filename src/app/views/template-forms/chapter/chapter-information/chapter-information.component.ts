import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-chapter-information',
  templateUrl: './chapter-information.component.html',
  styleUrls: ['./chapter-information.component.css']
})
export class ChapterInformationComponent implements OnInit {

  private chapter = {
    title: '',
    subtitle: ''
  };

  constructor( private router: Router) {

  }

  ngOnInit() {
  }

  saveData() {
    this.router.navigate(['/template-option-card']);
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
