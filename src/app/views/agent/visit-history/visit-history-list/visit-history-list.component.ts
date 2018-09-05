import { ChapterService } from './../../../../services/chapter/chapter.service';
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
import { VisitService } from '../../../../services/visit/visit.service';
import { Visit } from '../../../../models/visit';

@Component({
  selector: 'app-visit-history-list',
  templateUrl: './visit-history-list.component.html',
  styleUrls: ['./visit-history-list.component.css']
})
export class VisitHistoryListComponent implements OnInit {

  private object: Object = { 'margin-top': (((window.screen.height) / 2) - 200) + 'px' };
  private agents: User[] = new Array();
  private visits: any[] = new Array();
  hasdata: boolean;
  private agent: User = new User();
  private paginate: Paginate = new Paginate();
  @Output() page: number;
  filter: any = { name: '' };
  private type_filter: any;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private idAgent: string;
  private currentUser: string;
  private isAgent: boolean;
  private familyId: string;
  private visit: any;
  private agentName: string;
  private _visits: any = [
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
    private visitService: VisitService,
    private chapterService: ChapterService,
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
    this.isAgent = false;
  }
  ngOnInit() {
    this.hasdata = false;
    // this.familyId = localStorage.getItem('visitId');
    this.idAgent = localStorage.getItem('userId');
    this.currentUser = localStorage.getItem('currentIdPir');
    if (this.idAgent !== undefined && this.idAgent !== null) {
      this.getVisits();
      this.load();
    } else {
      this.idAgent = localStorage.getItem('currentIdPir');
      this.isAgent = true;
      this.getVisits();
    }
    this.permissions.canActivate(['/agente-visita/historico']);
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
    // this.getAgents();
  }

  getVisits() {
    if (this.filter.name !== '') { this.page = 0; }
    switch (this.type_filter) {
      case 1:
        this.loadVisits('number');
        break;
      case 2:
        this.loadVisits('child.name');
        break;
      case 3:
        this.loadVisits('family.name');
        break;
      default:
        this.loadVisits('number');
        break;
    }
  }

  loadVisits(type_filter) {
    this.loaderService.show();
    if (this.filter.name === null) {
      this.filter.name = '';
    }
    this.visitService.getVisits(this.idAgent, type_filter, this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.visits = success.content;
        if (this.visits.length !== 0) {
          if (this.visits[0].agent !== undefined) {
            this.agentName = this.visits[0].agent.name;
            if (this.idAgent === this.currentUser) {
              this.isAgent = true;
            }
          }
        }
        this.hasdata = true;
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
    this.userService.load(this.idAgent).subscribe(
      success => {
        this.agent = success;
        this.agentName = this.agent.name;
        if (this.agentName !== '' && this.agentName !== undefined) {
          this.isAgent = true;
        }
        this.getVisits();
      },
      error => console.log(error)
    );
  }

  setPage(page: number) {
    this.page = page;
    // this.getAgents();
  }

  setVisit(visit) {
    this.visit = visit;
  }

  setFilter(type) {
    this.type_filter = type;
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
        // this.getAgents();
        this.toastService.toastSuccess();
      },
      error => {
        console.log(error);
        this.toastService.toastError();
      }
    );
  }

  back() {
    this.router.navigate(['/agente-visita']);
  }
}
