import { Profile } from './../../models/profile';
import { RuleState } from './../../helpers/permissions';
import { Org } from './../../models/org';
import { Person } from './../../models/person';
import { User } from './../../models/user';
import { Component, OnInit, Output } from '@angular/core';
import { PageService } from '../../services/pagenate/page.service';
import { Paginate } from '../../models/paginate';
import { UserService } from '../../services/user/user.service';
import { ProfileService } from '../../services/profile/profile.service';
import { ToastService } from '../../services/toast-notification/toast.service';
import { Router } from '@angular/router';
import { Permissions } from '../../helpers/permissions';
import { LoaderService } from '../../services/loader/loader.service';


@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor() { }
  ngOnInit() { }
}
