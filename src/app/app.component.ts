import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/login/authentication.service';
import 'rxjs/add/operator/pairwise';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( router: Router) {
    router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (event.url !== '/chapter-dashboard') {
            localStorage.setItem('chapterId', '');
          }
        }
    });
  }
  OnInit() {

  }
}
