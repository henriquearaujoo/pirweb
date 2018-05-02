import { Alternative } from './../../models/alternative';
import { Conclusion } from './../../models/conclusion';
import { Injectable } from '@angular/core';
import { Constant } from '../../constant/constant';
import { RestService } from '../rest/rest.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Question } from '../../models/question';

@Injectable()
export class ConclusionService extends RestService {

  private apiurl = Constant.BASE_URL + 'chapters/conclusion/';
  private size: number;
  constructor(http: Http) {
    super(http);
    this.size = 10;
   }

   // *** CONCLUSION *** //
  public getConclusion() {
    return this.get(this.apiurl);
  }

  public insert(c: Conclusion): Observable<Conclusion> {
    return this.post(this.apiurl, c);
  }

  public update(c: Conclusion): Observable<Conclusion> {
    return this.put(this.apiurl, c);
  }

  public load(chapter_id: string) {
    return this.get(this.apiurl + 'search/?chapter_id=' + chapter_id);
  }

  // *** Alternatives *** //
  public insertAlternative(answer: Alternative): Observable<Alternative> {
    const currentURL = this.apiurl + 'question/alternative';
    return this.post(currentURL, answer);
  }

  public updateAlternative(answer: Alternative): Observable<Alternative> {
    const currentURL = this.apiurl + 'question/alternative';
    return this.put(currentURL, answer);
  }

  public getAlternative(question_id?: string, page?: number) {
     const currentURL = this.apiurl + 'question/alternative/search?question=' + question_id;
    //  const currentURL = this.apiurl + 'question/answer/search/page/?page=' + page + '&question=' + question_id;
     return this.get(currentURL);

  }

  public deleteAlternative(answer_id: string): Observable<Alternative> {
    const deleteAnswerURL = this.apiurl + 'question/alternative' + '/' + answer_id;
    return this.deleteR(deleteAnswerURL);
  }

  // *** QUESTIONS *** //
  public insertQuestion(question: Question): Observable<Question> {
    const currentURL = this.apiurl + 'questions';
    return this.post(currentURL, question);
  }

  public updateQuestion(question: Question): Observable<Question> {
    const currentURL = this.apiurl + 'questions';
    return this.put(currentURL, question);
  }

  public getQuestion(conclusion_id?: string, size?: number) {
    // if (conclusion_id === undefined) {
    //   const currentURL = this.apiurl + 'question/search/page?sort=description,asc';
    // return this.get(currentURL);
    // }
    const currentURL = this.apiurl + 'questions/search/page?size=' + size + '&conclusion=' + conclusion_id + '&sort=id,asc';
    return this.get(currentURL);
  }

  public deleteQuestion(question_id: string): Observable<Question> {
    const deleteQuestionURL = this.apiurl + 'questions' + '/' + question_id;
    return this.deleteR(deleteQuestionURL);
  }

  public loadQuestion(question_id: string) {
    return this.get(this.apiurl + 'questions/search/page?id=' + question_id + '&sort=id,asc');
  }
}

