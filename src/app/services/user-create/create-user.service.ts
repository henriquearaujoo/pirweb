import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Http } from '@angular/http';
import { User } from '../../models/user';

@Injectable()
export class CreateUserService extends RestService {

  apiurl = 'http://10.30.1.47:2020/';
  
    constructor(http : Http) {
      super(http);
    }
    
    public createUser(user:User){
        return this.post(this.apiurl + '/users',user);
    }
}
