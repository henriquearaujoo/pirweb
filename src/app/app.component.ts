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
    /* Scroll to Top */
    router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
  }
  OnInit() {

  }
}
