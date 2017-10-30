import {Component, OnInit, OnChanges, EventEmitter, Output, Input} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ProfileService } from '../../services/profile/profile.service';
import { Profile } from '../../models/profile';
import { PagenateComponent } from '../../components/pagenate/pagenate.component';
import { PageService } from '../../services/pagenate/page.service';
import { Rule } from '../../models/rule';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends PagenateComponent implements OnInit, OnChanges {

  @Input() profiles: Profile[] = new Array();
  @Input() profile: Profile = new Profile();
  hasdata: boolean;

  @Output() insertValue = new EventEmitter();
  @Output() filterValue = new EventEmitter();

  @Input() edit: boolean;
  @Input() selectedProfile: Profile = new Profile();

  constructor (
    pagerService: PageService,
    private profileService: ProfileService,
    private activeRoute: ActivatedRoute,
    private router: Router) {
      super(pagerService);
      this.hasdata = false;
     // this.edit = false;
    }

    ngOnInit() {
    }

    ngOnChanges() {
      this.hasdata = false;
    }

    save() {
      // const filter = this.profiles.filter(
      //   el => this.profile.title.toLowerCase() === el.title.toLowerCase());
      // if (filter.length === 0) {
       // console.log('Perfil não encontrado');
       this.profile.status = true;
        this.profile.rule = new Array();
        this.profileService.saveProfile(this.profile).subscribe(
          success => {
            this.profile = success;
            this.insertValue.emit(this.profile);
          },
          error => <any>error
        );
      // } else {
      //   console.log('Perfil Encontrado!');
      // }
    }

    onFilter() {
      this.filterValue.emit(this.profile);
    }

    saveEdit() {
      // const filter = this.profiles.filter(
      //   el => this.selectedProfile.title.toLowerCase() === el.title.toLowerCase());
      // if (filter.length === 0) {
      //   console.log('Perfil não encontrado');
      console.log('perfi editado:', this.profile);
        this.profile.description = '';
        this.profile.status = true;
        this.profile.created_by = '';
        this.profile.modified_by = '';
        this.profileService.saveEditProfile(this.profile).subscribe(
          success => {
            this.profile = success;
            this.edit = false;
            this.insertValue.emit(this.profile);
            this.profile.title = '';
          },
          error => console.log('Erro ao editar: ', error)
        );
      // } else {
      //   console.log('Perfil Encontrado!');
      //   this.insertValue.emit(this.profile);
      // }
    }

    cancelEdit() {
      this.insertValue.emit(this.profile);
    }
}