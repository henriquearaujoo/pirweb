import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Http } from '@angular/http';
import { RuleService } from '../../../services/rule/rule.service';
import { Rule } from '../../../models/rule';
import { ProfileService } from '../../../services/profile/profile.service';
import { Profile } from '../../../models/profile';
import { Router } from '@angular/router';
import { PageService } from '../../../services/pagenate/page.service';
import { PagenateComponent } from '../../../components/pagenate/pagenate.component';
import { RuleProfile } from '../../../models/rule-profile';
import { AccessPageService } from '../../../services/page/page.service';
import { Page } from '../../../models/page';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  @Input() item: any;

  constructor () {
  }

  ngOnInit() {
  }

}
