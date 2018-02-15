import { error } from 'util';
import { ToastService } from './../../services/toast-notification/toast.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Community } from '../../models/community';
import { Subscription } from 'rxjs/Subscription';
import { CommunityService } from '../../services/community/community.service';
import { ModalService } from '../../components/modal/modal.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnDestroy {

  private community: Community = new Community();
  private subscription: Subscription;
  private isNewData: boolean;
  private urlId: string;

  constructor(
    private communityService: CommunityService,
    private toastService: ToastService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    /*check if is a new or update*/
    this.isNewData = true;
    this.urlId = localStorage.getItem('communityId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      localStorage.removeItem('communityId');
      this.load();
    }
  }

  saveData() {
    if (this.isNewData || this.community.id === undefined) {
      console.log('save');
      this.communityService.insert(this.community).subscribe(
        success => {
          this.community = success;
          this.isNewData  = false;
          this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
          console.log('saved with success!', this.community);
        },
        error => {
          this.toastService.toastError();
          console.log('update error:', error);
        }
      );
    } else {
      console.log('update');
      this.communityService.update(this.community).subscribe(
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
        this.community = success[0];
        console.log('Load:', this.community);
        if (this.community === undefined) {
          this.community = new Community();
        }
      },
      error => console.log(error)
    );
  }

  openModal() {
    this.modalService.modalCancel('/community-list');

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

  ngOnDestroy() {
  }
}
