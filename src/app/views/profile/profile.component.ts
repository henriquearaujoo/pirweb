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
export class ProfileComponent extends PagenateComponent implements OnInit, OnChanges {

  @Input() profiles: Profile[] = new Array();
  profile: Profile = new Profile();
  hasdata: boolean;

  @Output() insertValue = new EventEmitter();
  @Output() filterValue = new EventEmitter();

  @Input() edit: boolean;
  @Input() selectedProfile: Profile = new Profile();

  editProfile: any = { title: '', type: ''};
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
      this.editProfile.title = this.selectedProfile.title;
      this.editProfile.type = this.selectedProfile.type;
      if ( changes.edit) {
        if (this.edit) {
          // this.ngAfterViewInit();
          // this.focusInput();
        }
      }
    }

    focusInput() {
      this.inputEdit.nativeElement.focus();
    }

    save() {
      console.log(this.profile);
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
        this.selectedProfile.title = this.editProfile.title;
        this.selectedProfile.description = '';
        this.selectedProfile.created_by = '';
        this.selectedProfile.modified_by = '';
        this.selectedProfile.type = this.editProfile.type;
        console.log(this.selectedProfile);
        this.profileService.saveEditProfile(this.selectedProfile).subscribe(
          success => {
            // this.profile = success;
            this.edit = false;
            this.insertValue.emit(this.profile);
            this.toastService.toastSuccess();
          },
          error => {
            this.insertValue.emit(this.profile);
            if ( error === 'profile.title.exists') {
              this.toastService.toastErrorExist();
            } else {
              this.toastService.toastError();
            }
          }
        );
    }

    cancelEdit() {
      this.insertValue.emit(this.profile);
      this.profile.title = '';
    }

    public inputEnable() {
      if ( (<HTMLElement>document.getElementById('title_edit')) !== null) {
        (<HTMLElement>document.getElementById('title_edit')).blur();
        (<HTMLElement>document.getElementById('title_edit')).focus();
      }
    }
}
