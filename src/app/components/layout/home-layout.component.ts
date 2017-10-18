import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
  <div class="wrapper" >
    <app-header-bar ></app-header-bar>
    <app-side-bar ></app-side-bar>
    <div class="content-wrapper" style="background-color: #ffffff">
        <router-outlet></router-outlet>
    </div>    
  </div>
  `,
  styles: []
})
export class HomeLayoutComponent {}
