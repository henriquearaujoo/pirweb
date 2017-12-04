import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-chapter-information',
  templateUrl: './chapter-information.component.html',
  styleUrls: ['./chapter-information.component.css']
})
export class ChapterInformationComponent implements OnInit, AfterViewInit {

  private chapter = {
    title: '',
    subtitle: ''
  };

  constructor( private router: Router) {

  }

  ngOnInit() {
    // $('.editor').wysihtml5();
  }

  ngAfterViewInit() {
    // $('.editor').data('wysihtml5').editor.setValue('new content');
  }

  saveData() {
    this.router.navigate(['/template-chapter-option']);
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
