import { Component, OnInit, Output, Input } from '@angular/core';
import { User } from '../../../../models/user';
import { Person } from '../../../../models/person';
import { Profile } from '../../../../models/profile';
import { Org } from '../../../../models/org';
import { Paginate } from '../../../../models/paginate';
import { PageService } from '../../../../services/pagenate/page.service';
import { UserService } from '../../../../services/user/user.service';
import { ProfileService } from '../../../../services/profile/profile.service';
import { ToastService } from '../../../../services/toast-notification/toast.service';
import { Router } from '@angular/router';
import { Permissions, RuleState } from '../../../../helpers/permissions';
import { LoaderService } from '../../../../services/loader/loader.service';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.css']
})
export class FamilyListComponent implements OnInit {

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
  @Input() isAgent: boolean;

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
     }
  ngOnInit() {
    this.hasdata = false;
    this.getAgents();
    localStorage.removeItem('familyId');
    this.urlId = localStorage.getItem('userId');
    if (this.urlId !== undefined && this.urlId !== null) {
      this.load();
    }
    this.permissions.canActivate(['/agente-visita/familias']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
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

  setFamily(id) {
    localStorage.setItem('familyId', id);
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
