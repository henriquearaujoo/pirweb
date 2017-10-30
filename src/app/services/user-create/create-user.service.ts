import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Http } from '@angular/http';
import { User } from '../../models/user';

@Injectable()
export class CreateUserService extends RestService {

  private apiurl = 'http://localhost:2020/pir';//'http://10.30.1.47:2020/';

  constructor(http: Http) {
    super(http);
  }

  public createUser(user: User) {
      return this.post(this.apiurl + '/users', user);
  }

  public getStates(state_id?: number) {
    if ( state_id === undefined ) {
      return this.get(this.apiurl + '/states/');
    }
    return this.get(this.apiurl + '/states/' + state_id + `/`);
  }

  public getCities(state_id?: number) {
    if ( state_id === undefined ) {
      return this.get(this.apiurl + '/states/');
    }
    return this.get(this.apiurl + '/states/' + state_id + `/`);
  }
}
