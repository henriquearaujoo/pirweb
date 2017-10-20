import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user : User;
  constructor() {
      this.user = new User();
      
  }
  saveData(){
    console.log(this.user);
  }

  ngOnInit() {
  
  }

}
