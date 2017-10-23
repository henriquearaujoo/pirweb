import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { Types } from '../../models/types';

import { CreateUserService } from  '../../services/user-create/create-user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user : User;
  private types:Types[] = [new Types(1,"Pessoa Física"),new Types(1,"Pessoa Jurídica")];

  profile = ['Administrador', 'Agente','Terceiro'];
  //types = [ [0],[1]]
  constructor(private mCreateUserService : CreateUserService) {
      this.user = new User();
      this.types ;
  }

  saveData(){
    this.mCreateUserService.createUser(this.user).subscribe(
      success => {

      },
      error => console.log(error)
    )
    console.log(this.user);
  }

  ngOnInit() {
  
  }

}
