import { Constant } from './../../constant/constant';
import { Injectable, EventEmitter } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Http } from '@angular/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { Person } from '../../models/person';
import { Org } from '../../models/org';

@Injectable()
export class UserService extends RestService {

  private apiurl = Constant.BASE_URL;
  private user: User;
  disable = new EventEmitter();
  show_msg: boolean;
  private size: number;

  constructor(http: Http) {
    super(http);
    this.size = 10;
    this.show_msg = false;
  }

  public getUsers(filter?: any, page?: number) {
    if ( filter === undefined ) {
      return this.get(this.apiurl + 'users/search/page/?size=' + this.size + '&page=' + page + '&sort=name,asc');
    } else {
      return this.get(this.apiurl + 'users/search/page/?size=' + this.size + '&page=' + page + '&name=' + filter + '&sort=name,asc');
    }
  }

  public createUser(user: User) {
    return this.post(this.apiurl + 'users/', user);
  }

  public createPerson(person: Person) {
    return this.post(this.apiurl + 'users/person/', person);
  }

  public createEntity(org: Org) {
    return this.post(this.apiurl + 'users/entity/', org);
  }

  public saveEditUser(user: User): Observable<User> {
    const saveUserUrl = this.apiurl.concat('users/');
    return this.put(saveUserUrl, user);
  }

  public saveEditPerson(person: Person) {
    const saveUserUrl = this.apiurl.concat('users/person/');
    return this.put(saveUserUrl, person);
  }

  public saveEditEntity(org: Org) {
    const saveUserUrl = this.apiurl.concat('users/entity/');
    return this.put(saveUserUrl, org);
  }

  public disableUser(user: User): Observable<User> {
    const saveUserUrl = this.apiurl.concat('users/');
    this.disable.emit(user);
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

  public getCity(city_id?: number) {
     return this.get(this.apiurl + 'states/city/' + city_id + '/');
  }

  public load(id: string) {
    return this.get(this.apiurl + 'users/search/?id=' + id);
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  setShowMsg(msg: boolean) {
    this.show_msg = msg;
  }
}
