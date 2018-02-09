import { ToastService } from './../../services/toast-notification/toast.service';
import { Component, OnInit, OnChanges, EventEmitter, Output,
         Input, SimpleChanges, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ProfileService } from '../../services/profile/profile.service';
import { Profile } from '../../models/profile';
import { PagenateComponent } from '../../components/pagenate/pagenate.component';
import { PageService } from '../../services/pagenate/page.service';
import { Rule } from '../../models/rule';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends PagenateComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() profiles: Profile[] = new Array();
  profile: Profile = new Profile();
  hasdata: boolean;

  @Output() insertValue = new EventEmitter();
  @Output() filterValue = new EventEmitter();

  @Input() edit: boolean;
  @Input() selectedProfile: Profile = new Profile();

  editProfile: string;
  @Input() canUpdate: boolean;
  @Input() canCreate: boolean;
  @ViewChild('inputEdit') inputEdit: ElementRef;

  log: string;

  constructor (
    pagerService: PageService,
    private profileService: ProfileService,
    private activeRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router) {
      super(pagerService);
      this.hasdata = false;
    }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
      this.hasdata = false;
      this.editProfile = this.selectedProfile.title;
      if ( changes.edit) {
        if (this.edit) {
          this.ngAfterViewInit();
          this.focusInput();
        }
      }
    }

    focusInput() {
      this.inputEdit.nativeElement.focus();
    }

    ngAfterViewInit() {
      this.log = `inputEdit is ${this.inputEdit.nativeElement}`;
    }

    save() {
       this.profile.status = true;

        this.profile.rule = new Array();
        this.profileService.saveProfile(this.profile).subscribe(
          success => {
            this.profile = success;
            this.insertValue.emit(this.profile);
            this.toastService.toastSuccess();
          },
          error => {
            if ( error === 'profile.title.exists') {
              this.toastService.toastErrorExist();
            } else {
              this.toastService.toastError();
            }
          },
        );
    }

    onFilter() {
      this.filterValue.emit(this.profile);
    }

    saveEdit() {
        console.log('perfi editado:', this.selectedProfile);
        this.selectedProfile.title = this.editProfile;
        this.selectedProfile.description = '';
        this.selectedProfile.created_by = '';
        this.selectedProfile.modified_by = '';
        this.profileService.saveEditProfile(this.selectedProfile).subscribe(
          success => {
            this.profile = success;
            this.edit = false;
            this.insertValue.emit(this.profile);
            this.toastService.toastSuccess();
          },
          error => {
            if ( error === 'profile.title.exists') {
              this.toastService.toastErrorExist();
            } else {
              this.toastService.toastError();
            }
          }
        );
       // location.reload();
    }

    cancelEdit() {
      this.insertValue.emit(this.profile);
      this.profile.title = '';
    }
}
