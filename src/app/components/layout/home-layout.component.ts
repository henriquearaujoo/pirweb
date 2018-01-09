import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <app-header-bar ></app-header-bar>
    <app-side-bar ></app-side-bar>
    <div class="content-wrapper">
      <router-outlet>
      </router-outlet>
    </div>
  `,
  styleUrls: ['home-layout.component.css']
})
export class HomeLayoutComponent {}
