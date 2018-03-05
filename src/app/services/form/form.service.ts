import { Observable } from 'rxjs/Observable';
import { Form } from './../../models/form';
import { RestService } from './../rest/rest.service';
import { Http } from '@angular/http';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService extends RestService {
  private apiurl = Constant.BASE_URL + 'form/';
  private size: number;
  constructor(http: Http) {
    super(http);
    this.size = 10;
   }

  public insertForm(form: Form): Observable<Form> {
    const currentURL = this.apiurl ;
    return this.post(currentURL, form);
  }

  public updateForm(form: Form): Observable<Form> {
    const currentURL = this.apiurl;
    return this.put(currentURL, form);
  }

  public getForms(filter?: any, page?: number) {
    if ( filter === undefined ) {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page + '&sort=name,asc');
    } else {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page +
      '&name=' + filter  + '&sort=name,asc');
    }
  }

  public load(id: string) {
    console.log('id', id);
    return this.get(this.apiurl + id);
  }

  /* QUESTIONS */

  public insertQuestion(question: Form): Observable<Form> {
    const currentURL = this.apiurl ;
    return this.post(currentURL, question);
  }
}
