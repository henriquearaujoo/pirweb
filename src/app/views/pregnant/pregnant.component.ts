import { PregnantService } from './../../services/pregnant/pregnant.service';
import { Pregnant } from './../../models/pregnant';
import { error } from 'util';
import { ToastService } from './../../services/toast-notification/toast.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Community } from '../../models/community';
import { Subscription } from 'rxjs/Subscription';
import { CommunityService } from '../../services/community/community.service';
import { ModalService } from '../../components/modal/modal.service';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-pregnant',
  templateUrl: './pregnant.component.html',
  styleUrls: ['./pregnant.component.css']
})
export class PregnantComponent implements OnInit {

  private pregnant: Pregnant = new Pregnant();
  private subscription: Subscription;
  private isNewData: boolean;
  private urlId: string;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sab'},
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul',
                   8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
    todayBtnTxt: 'Hoje'
};

  constructor(
    private communityService: CommunityService,
    private pregnantService: PregnantService,
    private toastService: ToastService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    /*check if is a new or update*/
    this.isNewData = true;
    this.urlId = localStorage.getItem('pregnantId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      localStorage.removeItem('pregnantId');
      this.load();
    }
  }

  saveData() {
    if (this.isNewData || this.pregnant.id === undefined) {
      console.log('save');
      // this.communityService.insert(this.pregnant).subscribe(
      //   success => {
      //     this.community = success;
      //     this.isNewData  = false;
      //     this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
      //     console.log('saved with success!', this.community);
      //   },
      //   error => {
      //     this.toastService.toastError();
      //     console.log('update error:', error);
      //   }
      // );
    } else {
      console.log('update');
      this.pregnantService.update(this.pregnant).subscribe(
        success => {
          this.toastService.toastMsg('Sucesso', 'Informações atualizadas com sucesso!');
        },
        error => console.log(error)
      );
    }

  }

  load() {
    this.communityService.load(this.urlId).subscribe(
      success => {
        this.pregnant = success[0];
        console.log('Load:', this.pregnant);
        if (this.pregnant === undefined) {
          this.pregnant = new Pregnant();
        }
      },
      error => console.log(error)
    );
  }

  openModal() {
    this.modalService.modalCancel('/pregnant-list');

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
