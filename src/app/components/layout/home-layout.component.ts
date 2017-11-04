import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <app-header-bar ></app-header-bar>
    <app-side-bar ></app-side-bar>
    <div class="content-wrapper" style="background-color: #ffffff; min-height: 587px;">
        <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class HomeLayoutComponent {}
