import { Headers } from '@angular/http';
import { PagenateComponent } from './../../../components/pagenate/pagenate.component';
import { AccessPageService } from './../../../services/access-page/access-page.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { AccessPage } from '../../../models/access-page';
import { PageService } from '../../../services/pagenate/page.service';
import { Router } from '@angular/router';
import { Profile } from '../../../models/profile';

@Component({
  selector: 'app-page',
  templateUrl: './access-page.component.html',
  styleUrls: ['./access-page.component.css']
})
export class AccessPageComponent extends PagenateComponent implements OnInit {

  pages: AccessPage[] = new Array();
  pageAllowed: AccessPage[] = new Array();

  public selectedProfile: Profile = new Profile();
  public nameProfile: string;

  hasdata: boolean;


  constructor(
    pagerService: PageService,
    private accessPageService: AccessPageService,
    private router: Router) {
      super(pagerService);
      this.hasdata = false;
     }

  ngOnInit() {
    this.hasdata = false;
    this.getPagesDenied();
    this.selectedProfile = this.accessPageService.getProfile();
    this.nameProfile = this.selectedProfile.name;
    console.log("Perfil retornado do serviço",this.selectedProfile)
  }
  

  getPagesDenied(){
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

  // addPage (item){
  //   this.pageAllowed.push(item)
  //  // console.log(this.pageAllowed)
  // }

}
