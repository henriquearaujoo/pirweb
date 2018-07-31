import { PregnantService } from './../../../services/pregnant/pregnant.service';
import { PageService } from './../../../services/pagenate/page.service';
import { PagenateComponent } from './../../../components/pagenate/pagenate.component';
import { PregnanciesComponent } from './../pregnancies/pregnancies.component';
import { LoaderService } from './../../../services/loader/loader.service';
import { Permissions, RuleState } from './../../../helpers/permissions';
import { CommunityService } from './../../../services/community/community.service';
import { Pregnant } from './../../../models/pregnant';
import { Responsible } from './../../../models/responsible';
import { ResponsibleService } from './../../../services/responsible/responsible.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pregnant-details',
  templateUrl: './pregnant-details.component.html',
  styleUrls: ['./pregnant-details.component.css']
})
export class PregnantDetailsComponent  extends PagenateComponent implements OnInit {

  private pregnant: Pregnant = new Pregnant();
  private infoTab: string;
  private pregnanciesTab: string;
  private urlId: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  private pregnancy: any;
  private showPregnancy: boolean;

  constructor(
    private pregnantService: PregnantService,
    private communityService: CommunityService,
    private loaderService: LoaderService,
    private permissions: Permissions,
    private servicePage: PageService
  ) {
    super(servicePage);
    this.canCreate = false;
    this.canUpdate = false;
    this.canRead = false;
    this.canDelete = false;
   }

  ngOnInit() {
    this.permissions.canActivate(['/gestantes/detalhes']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
    this.urlId = localStorage.getItem('pregnantId');
    if (this.urlId !== null && this.urlId !== '') {
      this.load();
    }
    this.walk(0);
  }

  load() {
    this.loaderService.show();
    this.pregnantService.load(this.urlId).subscribe(
      success => {
        this.pregnant = success;
        console.log(this.pregnant);
        this.loaderService.hide();
        // if (this.responsible.mother === undefined) {
        //   this.responsible.mother = new Pregnant();
        // }
      },
      error => {
        this.loaderService.hide();
        console.log(error);
      }
    );
  }

  toViewPregnancies(pregnancy) {
    this.pregnancy = pregnancy;
    this.showPregnancy = true;
  }

  toShowPregnancy(event) {
    this.showPregnancy = event;
  }

  walk ( tab: number) {
    switch (tab) {
      case 0:
      this.infoTab = './assets/img/pregnant/ic_section_info_enable.png';
      this.pregnanciesTab = './assets/img/pregnant/ic_section_pregnancies_disable.png';
      break;
      case 1:
      this.infoTab = './assets/img/pregnant/ic_section_info_disable.png';
      this.pregnanciesTab = './assets/img/pregnant/ic_section_pregnancies_enable.png';
      break;
    }
  }

}
