import { AuthenticationService } from './../../services/login/authentication.service';
import { Component, OnInit, Compiler } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  constructor(
    // private _compiler: Compiler,
    private route: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
}
