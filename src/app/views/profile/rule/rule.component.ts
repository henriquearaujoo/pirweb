import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { RuleService } from '../../../services/rule/rule.service';
import { Rule } from '../../../models/rule';
import { ProfileService } from '../../../services/profile/profile.service';
import { Profile } from '../../../models/profile';
import { Router } from '@angular/router';
import { PageService } from '../../../services/pagenate/page.service';
import { PagenateComponent } from '../../../components/pagenate/pagenate.component';
import { RuleProfile } from '../../../models/rule-profile';
import { AccessPageService } from '../../../services/access-page/access-page.service';

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

  //rules: Rule[] = new Array();
  rules: any[] = ['Visualizar', 'Criar', 'Editar', 'Desabilitar']
  checked: any[] = new Array();

  ruleProfile: RuleProfile = new RuleProfile();

  profile: Profile = new Profile();
  hasdata: boolean;

  constructor(
    pagerService: PageService,
    private http: Http,
   // private ruleService: RuleService,
    private profileService: ProfileService,
    private accessPageService: AccessPageService,
    private router: Router) {    
      super(pagerService);
      this.hasdata = false;
    }

  ngOnInit() {
    console.log(this.selectedPage);       
    //this.getRules()     
    this.rules
    
  }
  
 // getRules(){

    
    // this.ruleService.getRules().subscribe(
    //   success => {
    //     this.rules = success;
    //     this.hasdata = true;
    //   },
    //   error => this.hasdata = false
    // );
    // console.log(this.rules)
//  }
  
  updateChecked(option, event) {
    console.log('event.target.value ' + event.target.value);
    var index = this.checked.indexOf(option);
    if(event.target.checked) {
      console.log('add');
      if(index === -1) {
        this.checked.push(option);
      }
    } else {
      console.log('remove');
      if(index !== -1) {
        this.checked.splice(index, 1);
      }
    }
    
    console.log(this.checked);
  }


  confirmRules(){    
    this.profile = this.accessPageService.getProfile();

    this.ruleProfile.rules= this.checked;
    this.ruleProfile.idPage = this.selectedPage;
    this.ruleProfile.idProfile = this.profile;

    this.accessPageService.setRules(this.ruleProfile);

    // this.profileService.saveRuleProfile(this.ruleProfile).subscribe(
    //   success => {
    //     this.profile.ruleProfile.push(success);
    //     this.profileService.saveEditProfile(this.profile);
    //   },
    //   error => <any>error
    // ); 
  }
}
