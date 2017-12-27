import { Question } from './../../../../models/question';
import { error } from 'util';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Conclusion } from '../../../../models/conclusion';
import { ConclusionService } from '../../../../services/conclusion/conclusion.service';
import { ToastService } from '../../../../services/toast-notification/toast.service';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.css']
})
export class ConclusionComponent implements OnInit {

  hasdata: boolean;

  private conclusion: Conclusion;
  public chapter: string;
  public isNewData: boolean;
  @Output() cancelEvent = new EventEmitter();
  private btn_cancel: boolean;
  private add_question: boolean;

  public editorOptions = {
    placeholder: '...',
    theme: 'snow'
  };

  constructor(
    private conclusionService: ConclusionService,
    private toastService: ToastService
  ) {
    this.hasdata = false;
   }

  ngOnInit() {
    this.conclusion = new Conclusion();
    this.btn_cancel = false;
    this.add_question = false;
  }

  saveData() {
    if (this.btn_cancel) {
      this.btn_cancel = false;
      return false;
    }
    this.conclusion.chapter = this.chapter;
    // this.conclusion.questions = new Array( new Question());
    if (this.isNewData || this.conclusion.id === undefined) {
      this.conclusionService.insert(this.conclusion).subscribe(
        s => {
          this.isNewData  = false;
          this.conclusion = s;
          this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
          console.log('saved with success!');
        },
        e => {
          this.toastService.toastError();
          console.log('error: ' + e);
        }
      );
    }else {
      this.conclusionService.update(this.conclusion).subscribe(
        s => {
          this.conclusion = s;
          this.toastService.toastMsg('Sucesso', 'Informações atualizadas com sucesso');
          console.log('saved with success!');
        },
        e => {
          this.toastService.toastError();
          console.log('error: ' + e);
        }
      );
    }
  }

  load(chapter) {
    this.chapter = chapter;
    this.conclusionService.load(chapter).subscribe(
      success => {
          this.conclusion = success[0];
          console.log('Load:', this.conclusion);
          if (this.conclusion === undefined) {
            this.conclusion = new Conclusion();
          }
      },
      e => {
        console.log('PirError:' + e);
      }
    );
  }

  createNewQuestion() {
    this.add_question = true;
  }

  onCancel() {
    this.cancelEvent.emit();
    this.btn_cancel = true;
  }

  onCancelAddAnswer(event) {
    if (event) {
      this.add_question = false;
    }
  }

  verifyValidSubmitted(form, field) {
    return form.submitted && !field.valid;
  }

  applyCssError(form, field) {
    return {
      'has-error': this.verifyValidSubmitted(form, field),
      'has-feedback': this.verifyValidSubmitted(form, field)
    };
  }
}
