import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <app-header-bar ></app-header-bar>
    <app-side-bar ></app-side-bar>
    <div class="content-wrapper">
      <router-outlet>
      <ngx-spinner
          bdOpacity = 0.5
          bdColor = "#333"
          size = "large"
          color = "#fff"
          type = "ball-spin-clockwise-fade">
      </ngx-spinner>
      </router-outlet>
    </div>
  `,
  styleUrls: ['home-layout.component.css']
})
export class HomeLayoutComponent {}
