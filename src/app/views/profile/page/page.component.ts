import { Headers } from '@angular/http';
import { PagenateComponent } from './../../../components/pagenate/pagenate.component';
import { AccessPageService } from './../../../services/page/page.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Page } from '../../../models/page';
import { PageService } from '../../../services/pagenate/page.service';
import { Router } from '@angular/router';
import { Profile } from '../../../models/profile';
import { RuleProfile } from '../../../models/rule-profile';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent extends PagenateComponent implements OnInit {

  pages: Page[] = new Array();
  pageAllowed: Page[] = new Array();

  public rulesProfile: any[] = new Array();

  public selectedProfile: Profile = new Profile();
  public nameProfile: string;

  hasdata: boolean;


  constructor(
    pagerService: PageService,
    private profileService: ProfileService,
    private accessPageService: AccessPageService,
    private router: Router) {
      super(pagerService);
      this.hasdata = false;
     }

  ngOnInit() {
    this.hasdata = false;    
    this.rulesProfile=[]
    this.getPagesDenied();
    this.selectedProfile = this.accessPageService.getProfile();
    this.nameProfile = this.selectedProfile.name;
    this.getPagesAllowed();
    console.log("Perfil retornado do serviço",this.selectedProfile)
  }
  

  getPagesDenied() {
    this.accessPageService.getPages().subscribe(
      sucess => {
        this.pages = sucess;
        this.allItems = this.pages;
        this.setPage(1);
        this.hasdata = true;
      },
      error => this.hasdata = false
    );
    //console.log(this.pages)
    
  }

  getPagesAllowed(){ 
     //this.rulesProfile = this.selectedProfile.ruleProfile;
     console.log("Regras do perfil", this.rulesProfile)
    // this.accessPageService.getPagesAllowed(this.selectedProfile).subscribe(
    //   sucess => {
    //     this.rulesProfile = sucess;
    //     //console.log
    //   },
    //   error => this.hasdata = false
    // );
  }

  //  saveRules (){
  //   this.profileService.saveRuleProfile(this.accessPageService.getRulesProfile()).subscribe(
  //     success => {
  //       // this.profile.ruleProfile.push(success);
  //       // this.profileService.saveEditProfile(this.profile);
  //     },
  //     error => <any>error
  //   ); 
  // }

}
