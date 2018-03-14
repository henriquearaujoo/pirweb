import { FormQuestionB } from './../../models/form-question-b';
import { FormQuestionA } from './../../models/form-question-a';
import { Observable } from 'rxjs/Observable';
import { Form } from './../../models/form';
import { RestService } from './../rest/rest.service';
import { Http } from '@angular/http';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService extends RestService {
  private apiurl = Constant.BASE_URL + 'forms/';
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
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page );
    } else {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page );
    }
  }

  public load(id: string) {
    console.log('id', id);
    return this.get(this.apiurl + id);
  }

  /* QUESTIONS */

  public insertQuestionA(question: FormQuestionA): Observable<FormQuestionA> {
    const currentURL = this.apiurl + 'questions/atype' ;
    return this.post(currentURL, question);
  }

  public insertQuestionB(question: FormQuestionB): Observable<FormQuestionB> {
    const currentURL = this.apiurl + 'questions/btype' ;
    return this.post(currentURL, question);
  }

  public getQuestions(filter?: any, page?: number) {
    if ( filter === undefined ) {
      return this.get(this.apiurl + 'questions/atype/search/page/?size=' + this.size + '&page=' + page);
    } else {
      return this.get(this.apiurl + 'questions/atype/search/page/?size=' + this.size + '&page=' + page);
    }
  }
}
