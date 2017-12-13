import { ToastService } from './../../services/toast-notification/toast.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { Person } from './../../models/person';
import { Org } from './../../models/org';
import { ProfileService } from './../../services/profile/profile.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { Types } from '../../models/types';

import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  private user: User;
  private types: Types[] = [new Types('PFIS', 'Pessoa Fi­sica'), new Types('PJUR', 'Pessoa Jurídica')];
  private states = new Array();
  private cities = new Array();
  private profiles: Profile[] = new Array();
  private org: Org;
  private person: Person;
  private first_name: string;
  private last_name: string;
  private hasdata: boolean;
  private show_pjur: boolean;
  private success: boolean;
  private error_list = new Array();
  private error_item = new Array<string>();
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};

  private accountTab: string;
  private personalTab: string;
  private adressTab: string;
  private currentTab: number;
  private previousTab: string;
  private nextTab: string;
  private next: string;
  private enable_save: boolean;
  private enable_previous: boolean;
  private cont: number;
  private modalSave: string;
  // @ViewChild('myModal') myModal: ElementRef;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService) {
      this.user = new User();
      this.org = new Org();
      this.person = new Person();
  }

  ngOnInit() {
    this.loadStates();
    this.loadProfiles();
    this.show_pjur = false;
    this.success = false;
    this.error_list = [];

    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';
    this.accountTab = '../../../assets/img/user/ic_account_enable.png';
    this.personalTab = '../../../assets/img/user/ic_personal_disable.png';
    this.adressTab = '../../../assets/img/user/ic_adress_disable.png';

    this.enable_save = false;
    this.enable_previous = false;
    this.cont = 0;
    this.modalSave = '#modal-default';

    (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';
  }

  ngOnChange() {
  }

  ngAfterViewInit() {
  }

  openModal() {
    // jQuery(this.myModal.nativeElement).modal('show').noConflict();
    // (<any>$('#myModal')).modal('show');
    //  $.noConflict(true);
     console.log($(window)); // jquery is accessible
    //  $('#myModal').modal('show');
    // $(this.myModal.nativeElement).modal('show');
  }

  saveData() {
    this.verifyType();
    console.log(this.user.profile);
    this.user.name = this.first_name + ' ' + this.last_name;
    this.user.address.city = Number(this.user.address.city);
    console.log('Usuários:', this.user);
    console.log('Cidades: ', this.cities);
    this.success = true;
    this.userService.createUser(this.user).subscribe(
      success => {
        // jQuery(this.myModal.nativeElement).modal('show');
        // (<any>$('#myModal')).modal('show');
        // this.userService.show_msg = true;
        this.success = true;
        // this.router.navigate(['/user-list']);
      },
      error => {
        this.error_list = error;
        this.verifyError();
      }
    );
  }

  public loadProfiles() {
    this.profileService.getProfiles().subscribe(
      success => {
          this.profiles = success;
          console.log(this.profiles);
          this.hasdata = true;
      },
      error => console.log(error)
    );
  }

  public loadStates(id?: string) {
    this.userService.getStates(id).subscribe(
      success => {
        if (success == null) {
          this.hasdata = false;
        }
        this.states = success;
        console.log(this.states);
        this.hasdata = true;
      },
      error => console.log(error)
    );
  }

  public loadCities(state_id: string) {
    this.userService.getCities(state_id).subscribe(
      success => {
        if (success == null) {
          this.hasdata = false;
        }
        this.cities = success;
        this.hasdata = true;
      },
      error => console.log(error)
    );
  }

  selectType() {
    switch (this.user.type) {
      case 'PFIS':
      {
        this.show_pjur = false;
        this.person = new Person();
        break;
      }

      case 'PJUR':
      {
        this.show_pjur = true;
        this.org = new Org();
        break;
      }
    }
  }

  verifyType() {
    switch (this.user.type) {
      case 'PFIS':
      {
        this.user.pfis = this.person;
        this.org = null;
        break;
      }

      case 'PJUR':
      {
        this.user.pjur = this.org;
        this.person = null;
        break;
      }
    }
  }

  verifyError() {
    if (this.error_list.length < 7) {
      this.error_list.forEach( er => {
        switch (er) {
          case 'user.type.pfis.cpf.valid': {
            console.log(er);
            this.toastService.toastErrorValid('CPF');
            break;
          }
          case 'user.type.pjur.cnpj.valid': {
            console.log(er);
            this.toastService.toastErrorValid('CPF');
            break;
          }
          case 'user.type.pfis.rg.short': {
            console.log(er);
            this.toastService.toastErrorValid('RG');
            break;
          }
          default: {
            this.toastService.toastError();
            console.log(this.error_list);
            console.log(er);
          }
        }
      });
    } else {
      const er  = this.error_list.toString();
      switch (er) {
        case 'user.login.exists': {
          console.log(er);
          this.toastService.toastErrorExists('LOGIN');
          break;
        }
        case 'user.type.pfis.cpf.exists': {
          console.log(er);
          this.toastService.toastErrorExists('CPF');
          break;
        }
        case 'user.type.pjur.cnpj.exists': {
          console.log(er);
          this.toastService.toastErrorExists('CNPJ');
          break;
        }
        case 'user.email.exists': {
          console.log(er);
          this.toastService.toastErrorExists('EMAIL');
          break;
        }
        case 'user.type.pfis.cpf.invalid': {
          console.log(er);
          this.toastService.toastErrorValid('CPF');
          break;
        }
        case 'user.type.pjur.cnpj.invalid': {
          console.log(er);
          this.toastService.toastErrorValid('CNPJ');
          break;
        }
        default: {
          this.toastService.toastError();
          console.log(er);
          console.log(this.error_list);
        }
      }
    }
   }

   isActive(tab: boolean) {
    if (tab) {
      if (this.currentTab === -1) {
            this.currentTab = 0;
      } else if (this.currentTab < 2) {
            this.currentTab++;
            this.cont++;
            console.log('TAB:', this.cont);
        }
    }else {
      if (this.currentTab > 0) {
            this.currentTab--;
            this.cont--;
            console.log('TAB:', this.cont);
          }
    }
      this.previousTab = '#tab_' + (this.currentTab + 1);
      this.nextTab = '#tab_' + (this.currentTab + 1);

      if (this.nextTab === '#tab_3') {
        this.enable_save = true;
      } else {
        this.enable_save = false;
      }

      if (this.currentTab === 0) {
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';
          this.accountTab = '../../../assets/img/user/ic_account_enable.png';
          this.personalTab = '../../../assets/img/user/ic_personal_disable.png';
          this.adressTab = '../../../assets/img/user/ic_adress_disable.png';

      }else if (this.currentTab === 1) {
          this.accountTab = '../../../assets/img/user/ic_account_disable.png';
          this.personalTab = '../../../assets/img/user/ic_personal_enable.png';
          this.adressTab = '../../../assets/img/user/ic_adress_disable.png';
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = '';
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = '';
      }else {
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
          this.accountTab = '../../../assets/img/user/ic_account_disable.png';
          this.personalTab = '../../../assets/img/user/ic_personal_disable.png';
          this.adressTab = '../../../assets/img/user/ic_adress_enable.png';
          this.next = 'Salvar';
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

  backToList() {
    this.router.navigate(['user-list']);
  }
}
