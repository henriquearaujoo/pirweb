import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/login/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showMenu: boolean = false
  
    constructor( private authenticationService: AuthenticationService ){
      
    }
  
    ngOnInit(){
      this.authenticationService.showMenuEmitter.subscribe(
        show => this.showMenu = show
      )
    }

}
