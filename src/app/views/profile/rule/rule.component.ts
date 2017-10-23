import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { RuleService } from '../../../services/rule/rule.service';
import { Rule } from '../../../models/rule';
import { ProfileService } from '../../../services/profile/profile.service';
import { Profile } from '../../../models/profile';
import { Router } from '@angular/router';
import { PageService } from '../../../services/pagenate/page.service';
import { PagenateComponent } from '../../../components/pagenate/pagenate.component';

@Component({
  selector: 'app-rule',
  inputs: ['pk', 'header'],
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent extends PagenateComponent implements OnInit {

  @Input() selectedPage :any;
  @Input() pk: any;
  @Input() lg: boolean = false;

  rules: Rule[] = new Array();
  profile: Profile = new Profile();
  hasdata: boolean;

  constructor(
    pagerService: PageService,
    private http: Http,
    private ruleService: RuleService,
    private profileService: ProfileService,
    private router: Router
  ) {    
      super(pagerService);
      this.hasdata = false;
    }

  ngOnInit() {
    console.log(this.selectedPage);   
    
    this.getRules();
    
  }

  
  getRules(){
    this.ruleService.getRules().subscribe(
      success => {
        this.rules = success;
        this.hasdata = true;
      },
      error => this.hasdata = false
    );
    console.log(this.rules)
  }

  onClicked(option, $event){
    this.selectedPage.rule = option.id
  }

  saveRules(form){
    this.profileService.saveEditRule(this.selectedPage).subscribe(
      success => {
        this.selectedPage = success
      },
      error => <any>error
    ); 
  }
}
