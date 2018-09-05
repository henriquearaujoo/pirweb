import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { City } from './../../../models/city';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { User } from '../../../models/user';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from '../../../services/profile/profile.service';
import { Profile } from '../../../models/profile';
import { ToastService } from '../../../services/toast-notification/toast.service';
import { Address } from '../../../models/address';
import { IMyDate } from 'mydatepicker';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private user: User;
  show_pjur: boolean;
  private profiles: Profile[] = new Array();
  private profile: Profile = new Profile();
  private cities: City[];
  private city_id: number;
  private state_id: string;
  private object: Object = { 'margin-top': (((window.screen.height) / 2) - 200) + 'px' };
  private urlId: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private url: string;
  private accountTab: string;
  private personalTab: string;
  private adressTab: string;
  private agentTab: string;
  private selDate: String;

  @Input() isAgent: boolean;


  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router,
    private permissions: Permissions,
    private loaderService: LoaderService) {
    this.user = new User();
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
  }

  ngOnInit() {
    this.permissions.canActivate(['/usuarios/detalhes', '/agente-dashboard/detalhes']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.show_pjur = false;
    this.urlId = localStorage.getItem('userId');
    if (this.urlId !== undefined || this.urlId !== '') {
      this.loadUser();
    }

    const state: RouterState = this.router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    this.url = snapshot.url;

    this.accountTab = './assets/img/user/ic_account_enable.png';
    this.personalTab = './assets/img/user/ic_personal_disable.png';
    this.adressTab = './assets/img/user/ic_adress_disable.png';
    this.agentTab = './assets/img/user/section_info_agent_disable.png';
  }

  verifyType() {
    if (this.user !== undefined) {
      if (this.user.person !== undefined && this.user.person !== null) {
        this.user.type = 'PFIS';
        this.show_pjur = false;
      } else {
        this.user.type = 'PJUR';
        this.show_pjur = true;
      }
    }
  }

  loadUser() {
    this.loaderService.show();
    this.userService.load(this.urlId).subscribe(
      success => {
        this.user = success;
        this.verifyType();
        setTimeout(() => {
          this.loaderService.hide();
        }, 400);
        if (this.user.profile.title === 'Agente' && this.user.person.agent.code) {
          this.isAgent = true;
          this.fixBirthDate();
        }
      },
      error => {
        this.loaderService.hide();
        console.log(error);
      }
    );
  }

  fixBirthDate(): void {
    const brokeDate = this.user.person.agent.birth.toString().split('-');
    this.selDate = `${brokeDate[2]}/${brokeDate[1]}/${brokeDate[0]}`;
  }

  editUser() {
    localStorage.setItem('userId', this.user.id);
    if (this.url === '/usuarios/detalhes') {
      this.router.navigate(['/usuarios/registro']);
    } else {
      this.router.navigate(['/agente-dashboard/registro']);
    }
  }

  disableEnableUser() {
    if (this.user.status === true) {
      this.user.status = false;
    } else {
      this.user.status = true;
    }
    this.verifyNull();
    this.userService.saveEditUser(this.user).subscribe(
      success => {
        this.toastService.toastSuccess();
        // this.router.navigate(['/user-details']);
      },
      error => console.log(error)
    );
  }

  verifyNull() {
    this.user.profile_id = this.user.profile.id;
    this.user.address.city_id = this.user.address.city.id;
    this.user.profile.description = '';
    this.user.profile.updated_at = '';
    this.user.address.city.state.cities = [];
    if (this.user.latitude === null && this.user.longitude == null) {
      this.user.latitude = 0;
      this.user.longitude = 0;
    }
    if (this.user.person !== null && this.user.person !== undefined) {
      delete this.user.entity;
    } else {
      delete this.user.person;
    }
    delete this.user.visits;
    this.user.password = undefined;
  }

  walk(tab: number) {
    switch (tab) {
      case 0:
        this.accountTab = './assets/img/user/ic_account_enable.png';
        this.personalTab = './assets/img/user/ic_personal_disable.png';
        this.adressTab = './assets/img/user/ic_adress_disable.png';
        this.agentTab = './assets/img/user/section_info_agent_disable.png';
        break;
      case 1:
        this.accountTab = './assets/img/user/ic_account_disable.png';
        this.personalTab = './assets/img/user/ic_personal_enable.png';
        this.adressTab = './assets/img/user/ic_adress_disable.png';
        this.agentTab = './assets/img/user/section_info_agent_disable.png';
        break;
      case 2:
        this.accountTab = './assets/img/user/ic_account_disable.png';
        this.personalTab = './assets/img/user/ic_personal_disable.png';
        this.adressTab = './assets/img/user/ic_adress_enable.png';
        this.agentTab = './assets/img/user/section_info_agent_disable.png';
        break;
      case 3:
        this.accountTab = './assets/img/user/ic_account_disable.png';
        this.personalTab = './assets/img/user/ic_personal_disable.png';
        this.adressTab = './assets/img/user/ic_adress_disable.png';
        this.agentTab = './assets/img/user/section_info_agent_enable.png';
        break;
    }
  }

  back() {
    if (this.url === '/usuarios/detalhes') {
      this.router.navigate(['/usuarios']);
    } else {
      this.router.navigate(['/agente-dashboard']);
    }
  }
}
