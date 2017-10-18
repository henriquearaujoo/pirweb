import { Component } from '@angular/core';
import { AuthenticationService } from './services/login/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showMenu: boolean = false
  
    constructor( private authenticationService: AuthenticationService ){
      
    }
  
    ngOnInit(){
      this.authenticationService.showMenuEmitter.subscribe(
        show => this.showMenu = show
      )
    }
  
}
