import { element } from 'protractor';
import { Paginate } from './../../../models/paginate';
import { ToastService } from './../../../services/toast-notification/toast.service';
import { PageService } from './../../../services/pagenate/page.service';
import { User } from './../../../models/user';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { PagenateComponent } from '../../../components/pagenate/pagenate.component';
import { Profile } from '../../../models/profile';
import { ProfileService } from '../../../services/profile/profile.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Person } from '../../../models/person';
import { Org } from '../../../models/org';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  private users: User[] = new Array();
  private person: Person = new Person();
  private org: Org = new Org();
  private profile: Profile = new Profile();
  private profiles: Profile[] = new Array();
  hasdata: boolean;

  private user: User = new User();
  private paginate: Paginate = new Paginate();
  @Output() page: number;
  filter: any = {name: ''};
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};

  constructor(
    private pagerService: PageService,
    private userService: UserService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router) {
      this.hasdata = false;
      this.page = 0;
     }

  ngOnInit() {
    this.hasdata = false;
    this.getUsers();
    this.userService.disable.subscribe(
      success => {
        console.log('Desabilitado: ', success);
        this.users = this.users.filter( user => user.id !== success.id);
        this.getUsers();
      }
    );
  }

  ngOnChange() {
    this.getUsers();
  }

  getUsers() {
    if ( this.filter.name !== '') { this.page = 0; }
    this.userService.getUsers(this.filter.name, this.page).subscribe(
      success => {
        this.paginate = success;
        this.users = success.content;
        console.log('USERS:', this.users);
        console.log('show_msg', this.userService.show_msg);
        if (this.userService.show_msg) {
          this.toastService.toastSuccess();
          this.userService.show_msg = false;
        }
        this.profileService.getAllProfiles().subscribe(
          success_profiles => {
            this.profiles = success_profiles;
            this.users.forEach( user => {
              this.profiles.forEach( profile => {
                if ( user.profile === profile.id) {
                  user.profile = profile.title;
                }
              });
              }
            );
            this.hasdata = true;
           },
           error => console.log(error)
        );

      },
      error => this.hasdata = false
    );
  }

  setPage(page: number) {
    this.page = page;
    console.log('Página:', this.page);
    console.log('Filtro:', this.filter.name);
    this.getUsers();
  }

  setUser(user: User) {
    this.userService.setUser(user);
    localStorage.setItem('userId', user.id);
  }

  changeStatus(user: User) {
    this.user = user;
    console.log(this.user);
    console.log(this.user.status);
  }

  disableEnableUser() {
    if (this.user.status === true) {
      this.user.status = false;
    } else {
      this.user.status = true;
    }
    console.log('USER DISABLE', this.user);

    this.profileService.getProfiles().subscribe(
      success_profiles => {
        this.profiles = success_profiles;
        this.profiles.forEach( profile => {
          if (this.user.profile === profile.title) {
            this.user.profile = profile.id;
          }
        });
        this.verifyType();
        if (this.user.type === 'PJUR') {
          console.log('SAVE ORG', this.org);
          this.userService.saveEditEntity(this.org).subscribe(
            s_org => {
              this.getUsers();
              this.toastService.toastSuccess();
            },
            error => {
              console.log(error);
              this.toastService.toastError();
            }
          );
        } else {
          if (this.user.type === 'PFIS') {
            console.log('SAVE PERSON', this.person);
            this.userService.saveEditPerson(this.person).subscribe(
              s_person => {
                this.getUsers();
                this.toastService.toastSuccess();
              },
              error => {
                console.log(error);
              this.toastService.toastError();
              }
            );
          }
        }
      }
    );
    console.log(this.user);
  }

  verifyType() {
    if (this.user !== undefined) {
      switch (this.user.type) {
        case 'PFIS':
        {
          this.person.id = this.user.id;
          this.person.address = this.user.address;
          this.person.email = this.user.email;
          this.person.login = this.user.login;
          this.person.name = this.user.name;
          this.person.password = this.user.password;
          this.person.profile = this.user.profile;
          this.person.status = this.user.status;
          this.person.type = this.user.type;
          this.person.cpf = this.user.pfis.cpf;
          this.person.emitter = this.user.pfis.emitter;
          this.person.rg = this.user.pfis.rg;
          break;
        }

        case 'PJUR':
        {
          this.org.id = this.user.id;
          this.org.address = this.user.address;
          this.org.email = this.user.email;
          this.org.login = this.user.login;
          this.org.name = this.user.name;
          this.org.password = this.user.password;
          this.org.profile = this.user.profile;
          this.org.status = this.user.status;
          this.org.type = this.user.type;
          this.org.cnpj = this.user.pjur.cnpj;
          this.org.ie = this.user.pjur.ie;
          this.org.social_name = this.user.pjur.social_name;
          this.org.fantasy_name = this.user.pjur.fantasy_name;
          break;
        }
      }
    }
  }

  ngOnDestroy() {

  }

}
