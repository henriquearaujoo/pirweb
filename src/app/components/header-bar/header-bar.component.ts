import { AuthenticationService } from './../../services/login/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  constructor( private route: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('tokenPir');
    this.route.navigate(['/login']);
  }
}
