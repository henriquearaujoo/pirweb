import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestService } from '../rest/rest.service'
import { User } from '../../models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do'

@Injectable()
export class UserService    {
  private apiurl = 'http://localhost:3000/users';

  constructor(private http : Http) {
   // super(http);
  }

    getUsers(): Observable<User> {
   
        return this.http.get(this.apiurl)
        .map((response: Response) => <User>response.json())
        .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
    
    
    //Requisição http
   
    //return this.http.get('http://localhost:3000/users')User
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
}
}
