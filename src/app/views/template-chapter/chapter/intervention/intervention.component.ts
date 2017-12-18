import { ToastService } from './../../../../services/toast-notification/toast.service';
import { InterventionService } from './../../../../services/intervention/intervention.service';
import { Intervention } from './../../../../models/intervention';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})

export class InterventionComponent implements OnInit {

  private intervention: Intervention;
  public chapter: string;
  public isNewData: boolean;
  @Output() cancelEvent = new EventEmitter();

  constructor(
    private service: InterventionService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.intervention = new Intervention();
  }

  saveData() {
    this.intervention.chapter = this.chapter;
    if (this.isNewData) {
      this.service.insert(this.intervention).subscribe(
        s => {
          this.intervention = s;
          this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
          console.log('saved with success!');
        },
        e => {
          this.toastService.toastError();
          console.log('error: ' + e);
        }
      );
    }else {
      this.service.update(this.intervention).subscribe(
        s => {
          this.intervention = s;
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
    this.service.load(chapter).subscribe(
      success => {
          this.intervention = success;
      }
    );
  }

  onCancel() {
    this.cancelEvent.emit();
  }

}
