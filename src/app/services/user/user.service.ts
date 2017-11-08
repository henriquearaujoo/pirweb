import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Http } from '@angular/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService extends RestService {

  private apiurl = Constant.BASE_URL;
  private user: User;

  constructor(http: Http) {
    super(http);
  }

  public getUsers() {
    const currentURL = this.apiurl.concat('users');
    console.log(currentURL);
    return this.get(currentURL);
  }

  public createUser(user: User) {
    return this.post(this.apiurl + 'users', user);
  }

  public saveEditUser(user: User): Observable<User> {
    const saveUserUrl = this.apiurl.concat('users');
    return this.put(saveUserUrl, user);
  }

  public disableUser(user: User): Observable<User> {
    const saveUserUrl = this.apiurl.concat('users');
    return this.put(saveUserUrl, user);
  }

  public getStates(state_id?: string) {
    if ( state_id === undefined ) {
      return this.get(this.apiurl + 'states/');
    }
    return this.get(this.apiurl + 'states/state/' + state_id + `/`);
  }

  public getCities(state_id?: string) {
    if ( state_id === undefined ) {
      return this.get(this.apiurl + 'states/');
    }
    return this.get(this.apiurl + 'states/state/' + state_id + '/cities');
  }

  public getCity(city_id?: string) {
    return this.get(this.apiurl + 'states/city/' + city_id + '/');
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

}
