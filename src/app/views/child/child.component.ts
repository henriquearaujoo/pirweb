import { SweetAlert2Service } from './../../services/sweetalert/sweet-alert.2service';
import { LoaderService } from './../../services/loader/loader.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import { Permissions, RuleState } from './../../helpers/permissions';
import { ResponsibleService } from './../../services/responsible/responsible.service';
import { Responsible } from './../../models/responsible';
import { SweetAlertService } from './../../services/sweetalert/sweet-alert.service';
import { ChildService } from './../../services/child/child.service';
import { IMyDpOptions, IMyDateModel, IMyDate, IMyInputFieldChanged } from 'mydatepicker';
import { Child } from './../../models/child';
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
export class ChildComponent implements OnInit {

  private child: Child = new Child();
  private subscription: Subscription;
  private isNewData: boolean;
  private urlId: string;
  private infoTab: string;
  private visitsTab: string;
  private currentTab: number;
  private previousTab: string;
  private nextTab: string;
  private next: string;
  private enable_save: boolean;
  private enable_previous: boolean;
  private cont: number;
  private mothers: Responsible[] = new Array();
  private families: Responsible[] = new Array();
  private communities: Community[] = new Array();

  private isCkeckboxValid: boolean;
  private isFormValid: boolean;
  private tab: string;
  private _isSave: boolean;
  private openSaveButtonTab1: HTMLButtonElement;
  private openSaveButtonTab2: HTMLButtonElement;
  private type: any;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private onChange: boolean;

  private index1: any;
  private index2: any;
  private who_take_care: string;
  private who_take_care_list: any[] = new Array();
  private _who_take_care: any = [
    {
      description: 'Mãe',
      checked: null,
    },
    {
      description: 'Pai',
      checked: null
    },
    {
      description: 'Irmãos / Irmãs',
      checked: null
    },
    {
      description: 'Avô/Avó',
      checked: null
    },
    {
      description: 'Tios/Tia',
      checked: null
    },
    {
      description: 'Primo/Prima',
      checked: null
    }
  ];

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sab'},
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul',
                   8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
    todayBtnTxt: 'Hoje'
};
  private selDate: IMyDate = {year: 0, month: 0, day: 0};
  private isValidDate: boolean;

  constructor(
    private communityService: CommunityService,
    private childService: ChildService,
    private responsibleService: ResponsibleService,
    private toastService: ToastService,
    private modalService: ModalService,
    private sweetAlertService: SweetAlertService,
    private sweetAlert2Service: SweetAlert2Service,
    private loaderService: LoaderService,
    private permissions: Permissions,
    private route: Router
  ) {
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
    }

  ngOnInit() {
    this.permissions.canActivate(['/criancas/registro']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    /*check if is a new or update*/
    this.isNewData = true;
    this.urlId = localStorage.getItem('childId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      this.load();
    } else {
      // this.route.navigate(['/criancas']);
    }

    this.getFamilies();
    // this.getResponsible();
    // this.getCommunities();
    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';

    this.infoTab = './assets/img/child/ic_section_info_enable.png';
    this.visitsTab = './assets/img/child/ic_section_visits_disable.png';

    // this.openSaveButtonTab1 = (<HTMLButtonElement>document.getElementById('btn_tab1'));
    // this.openSaveButtonTab1.style.display = 'none';

    // this.openSaveButtonTab2 = (<HTMLButtonElement>document.getElementById('btn_tab2'));
    // this.openSaveButtonTab2.style.display = 'none';

    // (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';

    this.isValidDate = true;
    this.isCkeckboxValid = true;
  }

  saveData(isValid) {
    // const isValid = form1 && fomr2;
    this.updateOptions();

    if (isValid && this._isSave) {
      this.verifyDate();
      this.child.family_id = this.child.family.id;
      // if ( this.child.mother !== undefined && this.child.mother !== null) {
      //   if ( this.child.mother.id === undefined ) {
      //     delete this.child.mother;
      //   }
      // }
      // if (this.child.is_premature_born === false) {
      //   this.child.born_week = 1;
      // }
      // if ( !this.child.has_education_diff) {
      //   this.child.education_diff_specification = '';
      // }
      // this.child.born_week = Number(this.child.born_week);
      // // udated community
      // for (let i = 0; i < this.child.responsible.length; i++) {
      //   this.child.responsible[i].community.city_id = this.child.responsible[i].community.city.id;
      // }

      this.verifyNull();
      if (this.isNewData || this.child.id === undefined) {
        this.childService.insert(this.child).subscribe(
          success => {
            this.child = success;
            this.isNewData  = false;
            this.toastService.toastMsg('Sucesso', 'Informações inseridas com sucesso');
          },
          error => {
            this.toastService.toastError();
          }
        );
      } else {
        // console.log('update', this.child);
        this.childService.update(this.child).subscribe(
          success => {
            this.child = success;
            this.sweetAlertService.alertSuccessUpdate('/criancas');
          },
          error => {
            if (error[0] === 'whotakecare.missing') {
              this.toastService.toastMsgError('Atenção', 'Informe quem cuida da criança!');
            } else {
              this.toastService.toastError();
              console.log('update error:', error);
            }
          }
        );
      }
    } else {
      if (!isValid) {
        this.toastService.toastMsgError('Erro', 'Preencha todos os campos obrigatórios do formulário!');
      }
    }
  }

  verifyNull() {
    // if (this.child.mother !== undefined && this.child.mother !== null) {
    //   // if (this.child.mother.agent_id === null) {
    //   //   this.child.mother.agent_id = undefined;
    //   // }
    //   if (this.child.mother.community.city.state.cities === null) {
    //     this.child.mother.community.city.state.cities = [];
    //   }
    //   if (this.child.mother.community.city_id === null) {
    //     this.child.mother.community.city_id = undefined;
    //   }
    //   if ( (this.child.mother.community.city_id === undefined) || this.child.mother.community.city_id === null) {
    //     this.child.mother.community.city_id = this.child.mother.community.city.id;
    //   }
    // } else {
    //   delete this.child.mother;
    // }

    // this.child.responsible.forEach( resp => {
    //   if (resp.community.city.state.cities === null) {
    //     resp.community.city.state.cities = [];
    //   }
    // });
  }

  load() {
    this.loaderService.show();
    this.childService.load(this.urlId).subscribe(
      success => {
        this.child = success;
        console.log(this.child);
        // this.verifyDataCheckbox();
        this.changeDate();
        this.loaderService.hide();
        // if (this.child.mother === undefined) {
        //   this.child.mother = new Responsible();
        // }
      },
      error => {
        this.loaderService.hide();
        console.log(error);
      }
    );
  }

  changeDate() {
    const dateList = this.child.birth.split('-');
    this.child.birth = dateList[2] + '-' + dateList[1] + '-' + dateList[0];
    const d = new Date(this.child.birth);
    // console.log(d);
    d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
    this.selDate = {year: d.getFullYear(),
                    month: d.getMonth() + 1,
                    day: d.getDate()};
    this.selDate = this.selDate;
  }

  getCommunities() {
    this.communityService._getCommunities().subscribe(
      s => {
        this.communities = s;
      },
      error => console.log(error)
    );
  }

  getFamilies() {
    this.responsibleService.getAll().subscribe(
      s => {
        this.families = s;
      },
      error => console.log(error)
    );
  }

  getMothers() {
    this.subscription = this.responsibleService._getMothers().subscribe(
      success => {
        this.mothers = success;
      },
      error => console.log(error)
    );
  }


  // getResponsible() {
  //   this.subscription = this.responsibleService._getResponsible().subscribe(
  //     success => {
  //       this.responsible = success;
  //     },
  //     error => console.log(error)
  //   );
  // }

  onDateChanged(event: IMyDateModel) {
    this.selDate = event.date;
    const date = event.date.day + '-' + event.date.month + '-' + event.date.year;
    this.child.birth = date;
  }

  // verifyDate() {
  //   const date = this.selDate.year + '-' + this.selDate.month + '-' + this.selDate.year;
  //   this.child.birth = date;
  // }

  verifyDate() {
    const date = this.selDate.year + '-' + this.selDate.month + '-' + this.selDate.day;
    const d = new Date(date);
    const currentMonth = ('0' + (d.getMonth() + 1)).slice(-2);
    const currentDay = ('0' + d.getDate()).slice(-2);
    this.child.birth = this.selDate.year + '-' + currentMonth + '-' + currentDay;
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    this.isValidDate = event.valid;
  }

  // verifyDataCheckbox() {
  //   // this.who_take_care = this.child.who_take_care;
  //   this.who_take_care_list = this.who_take_care.split(',');

  //   for (let i = 0; i < this._who_take_care.length; i++) {
  //     for (let j = 0; j < this.who_take_care_list.length; j++ ) {
  //       if ( this._who_take_care[i].description === this.who_take_care_list[j]) {
  //         this._who_take_care[i].checked = true;
  //       }
  //     }
  //   }
  // }

  updateOptions() {
    if (this.who_take_care_list.length > 0) {
      for (let i = 0; i < this.who_take_care_list.length; i++) {
        if ( i === 0 ) {
          this.who_take_care = this.who_take_care_list[i];
        } else {
          this.who_take_care = this.who_take_care + ',' + this.who_take_care_list[i];
        }
      }
    } else {
      this.who_take_care = '';
    }

    // this.child.who_take_care = this.who_take_care;
  }

  verifyCheckbox(option, event) {
    // * CHECKED * /
    this.onChange = true;
    const value = event.target.value;
    if (event.target.checked) {
      this.who_take_care_list.push(value);

      if (this.who_take_care_list.length === 1) {
        this.isCkeckboxValid = false;
      } else {
        this.isCkeckboxValid = true;
      }

    } else {
      this.index1 = this.who_take_care_list.indexOf(value);
      this.who_take_care_list.splice(this.index1, 1);

      if (this.who_take_care_list.length === 1) {
        this.isCkeckboxValid = false;
      } else {
        this.isCkeckboxValid = true;
      }
      console.log(this.who_take_care_list);
    }
  }

  openModal() {
    this.modalService.modalCancel('/criancas');
  }

  onCancel() {
    if (this.onChange) {
      this.sweetAlert2Service.alertToSave()
      .then((result) => {
        if (result.value) {
          this._isSave = true;
          this.openSaveButtonTab2.click();
        } else {
          this.route.navigate(['/criancas']);
        }
      });
    } else {
      this.openModal();
    }
  }

  save(tab: string, isValid: boolean) {
    this.isFormValid = isValid;
    this.tab = tab;
    this._isSave = false;
  }

  isSave() {
    this._isSave = true;
  }

   isActive(tab: boolean, t?: number,  p?: number) {
    if ( p !== 0 ) {
      if (t === 1) {
        this.openSaveButtonTab1.click();
      } else {
        if ( t === 2) {
          this.isFormValid = true;
        }
      }
    } else {
      this.isFormValid = true;
    }


    if ( this.isFormValid && this.isValidDate ) {
      this.isFormValid = false;
      if (tab) {
        if (this.currentTab === -1) {
              this.currentTab = 0;
        } else if (this.currentTab < 2) {
              this.currentTab++;
              this.cont++;
          }
      }else {
        if (this.currentTab > 0) {
              this.currentTab--;
              this.cont--;
            }
      }
        this.previousTab = '#tab_' + (this.currentTab + 1);
        this.nextTab = '#tab_' + (this.currentTab + 1);

        if (this.nextTab === '#tab_2') {
          this.enable_save = true;
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
        } else {
          this.enable_save = false;
        }

        if (this.currentTab === 0) {
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = 'none';
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = '';
          this.infoTab = './assets/img/child/ic_section_info_enable.png';
          this.visitsTab = './assets/img/child/ic_section_visits_disable.png';

        }else if (this.currentTab === 1) {
          this.infoTab = './assets/img/child/ic_section_info_disable.png';
          this.visitsTab = './assets/img/child/ic_section_info_social_enable.png';
          (<HTMLButtonElement>document.getElementById('btn_previous')).style.display = '';
          (<HTMLButtonElement>document.getElementById('btn_next')).style.display = 'none';
        }
      } else {
        if (t === 1) {
          this.nextTab = '#tab_1';
        }
      }

  }

  walk ( tab: number) {
    switch (tab) {
      case 0:
      this.infoTab = './assets/img/pregnant/ic_section_info_enable.png';
      this.visitsTab = './assets/img/child/ic_section_visits_disable.png';
      break;
      case 1:
      this.infoTab = './assets/img/pregnant/ic_section_info_disable.png';
      this.visitsTab = './assets/img/child/ic_section_visits_enable.png';
      break;
    }
  }

  verifyValidSubmitted(form, field) {
    if (field.dirty) {
      this.onChange = true;
    }
    return (field.dirty || field.touched || form.submitted) && !field.valid;
  }

  applyCssError(form, field) {
    return {
      'has-error': this.verifyValidSubmitted(form, field),
      'has-feedback': this.verifyValidSubmitted(form, field)
    };
  }
}
