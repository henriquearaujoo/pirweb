import { FormQuestionB } from './../../models/form-question-b';
import { Observable } from 'rxjs/Observable';
import { Form } from './../../models/form';
import { RestService } from './../rest/rest.service';
import { Http } from '@angular/http';
import { Constant } from './../../constant/constant';
import { Injectable } from '@angular/core';
import { FormQuestion } from '../../models/form-question';

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
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page);
    } else {
      return this.get(this.apiurl + 'search/page/?size=' + this.size + '&page=' + page
      + '&age_zone=' + filter);
    }
  }

  public load(id: string) {
    return this.get(this.apiurl + id);
  }

  /* QUESTIONS */

  public insertQuestion(question: FormQuestion): Observable<FormQuestion> {
    const currentURL = this.apiurl + 'questions' ;
    return this.post(currentURL, question);
  }

  public updateQuestion(question: FormQuestion): Observable<FormQuestion> {
    const currentURL = this.apiurl + 'questions' ;
    return this.put(currentURL, question);
  }

  public getQuestions(filter?: any, page?: number) {
    if ( filter === undefined ) {
      return this.get(this.apiurl + 'questions/search/page/?size=' + this.size + '&page=' + page);
    } else {
      return this.get(this.apiurl + 'questions/search/page/?size=' + this.size + '&page=' + page);
    }
  }
}
