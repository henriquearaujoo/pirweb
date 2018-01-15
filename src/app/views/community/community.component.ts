import { ToastService } from './../../services/toast-notification/toast.service';
import { Component, OnInit } from '@angular/core';
import { Community } from '../../models/community';
import { Subscription } from 'rxjs/Subscription';
import { CommunityService } from '../../services/community/community.service';
import { ModalCancelService } from '../../components/modal-cancel/modal-cancel.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  private community: Community = new Community();
  private subscription: Subscription;

  constructor(
    private communityService: CommunityService,
    private toastService: ToastService,
    private modalService: ModalCancelService
  ) { }

  ngOnInit() {
  }

  saveData() {
    this.subscription = this.communityService.insert(this.community).subscribe(
      success => {
        this.toastService.toastSuccess();
      },
      error => {
        this.toastService.toastError();
      }
    );
  }

  openModal() {
    this.modalService.show();

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
