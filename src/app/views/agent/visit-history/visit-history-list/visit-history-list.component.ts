import { Component, OnInit, Output } from '@angular/core';
import { User } from '../../../../models/user';
import { Person } from '../../../../models/person';
import { Org } from '../../../../models/org';
import { Profile } from '../../../../models/profile';
import { Paginate } from '../../../../models/paginate';
import { PageService } from '../../../../services/pagenate/page.service';
import { ProfileService } from '../../../../services/profile/profile.service';
import { UserService } from '../../../../services/user/user.service';
import { ToastService } from '../../../../services/toast-notification/toast.service';
import { Router } from '@angular/router';
import { Permissions, RuleState } from '../../../../helpers/permissions';
import { LoaderService } from '../../../../services/loader/loader.service';

@Component({
  selector: 'app-visit-history-list',
  templateUrl: './visit-history-list.component.html',
  styleUrls: ['./visit-history-list.component.css']
})
export class VisitHistoryListComponent implements OnInit {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private agents: User[] = new Array();
  private person: Person = new Person();
  private org: Org = new Org();
  private profile: Profile = new Profile();
  private profiles: Profile[] = new Array();
  hasdata: boolean;
  private agent: User = new User();
  private paginate: Paginate = new Paginate();
  @Output() page: number;
  filter: any = {name: ''};
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private urlId: string;
  private familyId: string;
  private visit: any;
  private visits: any = [
    {
      number: '01',
      when: 'Início da gestação',
      theme: 'Suspeita de gravidez',
      date: '10/01/2018'
    },
    {
      number: '02',
      when: 'Início da gestação',
      theme: 'Acolhimento da gestante',
      date: '10/02/2018'
    },
    {
      number: '03',
      when: 'Início da gestação',
      theme: 'Início do acompanhamento',
      date: '10/03/2018'
    },
    {
      number: '04',
      when: '1º trimestre da gestação - 2º mês',
      theme: 'Higiene íntima e DST',
      date: '10/04/2018'
    }
  ];

  constructor(
    private pagerService: PageService,
    private userService: UserService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router,
    private permissions: Permissions,
    private loaderService: LoaderService) {
      this.filter.name = '';
      this.hasdata = false;
      this.page = 0;
      this.canCreate = false;
      this.canUpdate = false;
      this.canRead = false;
      this.canDelete = false;
      console.log(this.visit);
     }
  ngOnInit() {
    this.hasdata = false;
    this.getAgents();
    this.familyId = localStorage.getItem('familyId');
    this.urlId = localStorage.getItem('userId');
    if (this.urlId !== undefined && this.urlId !== null) {
      this.load();
    }
    this.permissions.canActivate(['/agent-visit/history-list']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );

    // const currentMonth = ('0' + (this.date.getMonth() + 1)).slice(-2);
  }

  ngOnChange() {
    this.getAgents();
  }

  getAgents() {
    if ( this.filter.name !== '') { this.page = 0; }
    this.loaderService.show();
    this.userService.getAgents(this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.agents = success.content;
        this.hasdata = true;
        // if (this.userService.show_msg) {
        //   this.toastService.toastSuccess();
        //   this.userService.show_msg = false;
        // }
        setTimeout(() => {
          this.loaderService.hide();
        }, 400);
      },
      error => {
        this.loaderService.hide();
        this.hasdata = false;
      }
    );
  }

  load() {
    this.userService.load(this.urlId).subscribe(
      success => {
        this.agent = success[0];
        console.log(success);
      },
      error => console.log(error)
    );
  }

  setPage(page: number) {
    this.page = page;
    this.getAgents();
  }

  setVisit(visit) {
    this.visit = visit;
  }

  changeStatus(user: User) {
    this.agent = user;
  }

  disableEnableAgent() {
    if (this.agent.status === true) {
      this.agent.status = false;
    } else {
      this.agent.status = true;
    }
    this.agent.profile_id = this.agent.profile.id;
    this.agent.address.city_id = this.agent.address.city.id;
    this.userService.saveEditUser(this.agent).subscribe(
      s_org => {
        this.getAgents();
        this.toastService.toastSuccess();
      },
      error => {
        console.log(error);
        this.toastService.toastError();
      }
    );
  }
}
