import { Answer } from './../../models/answer';
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

  // *** ANSWERS *** //
  public insertAnswer(answer: Answer): Observable<Answer> {
    const currentURL = this.apiurl + 'question/answer';
    return this.post(currentURL, answer);
  }

  public updateAnswer(answer: Answer): Observable<Answer> {
    const currentURL = this.apiurl + 'question/answer';
    return this.put(currentURL, answer);
  }

  public getAnswer(question_id?: string) {
    const currentURL = this.apiurl + 'question/answer/search?question=' + question_id;
    return this.get(currentURL);
  }

  public deleteAnswer(answer_id: string): Observable<Answer> {
    const deleteAnswerURL = this.apiurl + 'question/answer' + '/' + answer_id;
    return this.deleteR(deleteAnswerURL);
  }

  // *** QUESTIONS *** //
  public insertQuestion(question: Question): Observable<Question> {
    const currentURL = this.apiurl + 'question';
    return this.post(currentURL, question);
  }

  public updateQuestion(question: Question): Observable<Question> {
    const currentURL = this.apiurl + 'question';
    return this.put(currentURL, question);
  }

  public getQuestion(conclusion_id?: number, size?: number) {
    // if (conclusion_id === undefined) {
    //   const currentURL = this.apiurl + 'question/search/page?sort=description,asc';
    // return this.get(currentURL);
    // }
    const currentURL = this.apiurl + 'question/search/page?size=' + size + '&conclusion=' + conclusion_id + '&sort=description,asc';
    return this.get(currentURL);
  }

  public deleteQuestion(question_id: string): Observable<Question> {
    const deleteQuestionURL = this.apiurl + 'question' + '/' + question_id;
    return this.deleteR(deleteQuestionURL);
  }

  public loadQuestion(question_id: string) {
    return this.get(this.apiurl + 'question/search/page?id=' + question_id + '&sort=description,asc');
  }
}

