import { Headers } from '@angular/http';
import { PagenateComponent } from './../../../components/pagenate/pagenate.component';
import { AccessPageService } from './../../../services/page/access-page.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Page } from '../../../models/page';
import { PageService } from '../../../services/pagenate/page.service';
import { Router } from '@angular/router';
import { Profile } from '../../../models/profile';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent extends PagenateComponent implements OnInit {

  pages: Page[] = new Array();
  pageAllowed: Page[] = new Array();

  @Input() selectedProfile: any;

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
    this.getPages();
    console.log(this.selectedProfile)
  }
  

  getPages(){
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

  addPage (item){
    this.pageAllowed.push(item)
   // console.log(this.pageAllowed)
  }

}
