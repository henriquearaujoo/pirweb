
import { ChapterInformationComponent } from './../chapter-information/chapter-information.component';
import { InterventionComponent } from './../intervention/intervention.component';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ReceptionComponent } from '../reception/reception.component';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-chapter-dashboard',
  templateUrl: './chapter-dashboard.component.html',
  styleUrls: ['./chapter-dashboard.component.css'],

})
export class ChapterDashboardComponent implements OnInit {

  private informationTab: string;
  private receptionTab: string;
  private conclusionTab: string;
  private interventionTab: string;

  private previousTab: string;
  private currentTab: number;
  private nextTab: string;
  private next: string;
  private enable_save: boolean;
  private currentChapter: any;
  constructor() { }

  @ViewChild('informationChild')
  information: ChapterInformationComponent;
  @ViewChild('receptionChild')
  receptionComponent: ReceptionComponent;
  @ViewChild('intervention')
  interventionComponent: InterventionComponent;
  // @ViewChild('receptionChild')
  // receptionComponent: ReceptionComponent;

  sendEventToSave(id: number) {
    switch (id) {
      case 0:
        break;
      case 1:
        this.receptionComponent.saveData();
        break;
    }
  }

  ngOnInit() {
    this.currentTab = 0;

    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';

    this.informationTab = '../../../assets/img/chapter/ic_chapter_tab_information_enable.png';
    this.receptionTab = '../../../assets/img/chapter/ic_chapter_tab_reception_disable.png';
    this.interventionTab = '../../../assets/img/chapter/ic_chapter_tab_intervention_disable.png';
    this.conclusionTab = '../../../assets/img/chapter/ic_chapter_tab_question_disable.png';

    this.currentChapter = 1;
    this.enable_save = false;

  }

  isActive(tab: boolean) {
    /*
      if true then save data of current component
      else load information of previuos component
    */
    if (tab) {
      if (this.currentTab === -1) {
        this.currentTab = 0;
      } else if (this.currentTab < 3) {
        this.sendEventToSave(this.currentTab);
        this.currentTab++;
      }
    }else {
      if (this.currentTab > 0) {
        this.currentTab--;
      }
    }
    this.previousTab = '#tab_' + (this.currentTab + 1);
    this.nextTab = '#tab_' + (this.currentTab + 1);

    if (this.nextTab === '#tab_4') {
      this.enable_save = true;
    } else {
      this.enable_save = false;
    }

    switch (this.currentTab) {
        case 0:
          this.informationTab = '../../../assets/img/chapter/ic_chapter_tab_information_enable.png';
          this.receptionTab = '../../../assets/img/chapter/ic_chapter_tab_reception_disable.png';
          this.interventionTab = '../../../assets/img/chapter/ic_chapter_tab_intervention_disable.png';
          this.conclusionTab = '../../../assets/img/chapter/ic_chapter_tab_question_disable.png';
          break;
        case 1:

          this.informationTab = '../../../assets/img/chapter/ic_chapter_tab_information_disable.png';
          this.receptionTab = '../../../assets/img/chapter/ic_chapter_tab_reception_enable.png';
          this.interventionTab = '../../../assets/img/chapter/ic_chapter_tab_intervention_disable.png';
          this.conclusionTab = '../../../assets/img/chapter/ic_chapter_tab_question_disable.png';
          break;
        case 2:
          this.informationTab = '../../../assets/img/chapter/ic_chapter_tab_information_disable.png';
          this.receptionTab = '../../../assets/img/chapter/ic_chapter_tab_reception_disable.png';
          this.interventionTab = '../../../assets/img/chapter/ic_chapter_tab_intervention_enable.png';
          this.conclusionTab = '../../../assets/img/chapter/ic_chapter_tab_question_disable.png';
          break;
        case 3:
          this.informationTab = '../../../assets/img/chapter/ic_chapter_tab_information_disable.png';
          this.receptionTab = '../../../assets/img/chapter/ic_chapter_tab_reception_disable.png';
          this.interventionTab = '../../../assets/img/chapter/ic_chapter_tab_intervention_disable.png';
          this.conclusionTab = '../../../assets/img/chapter/ic_chapter_tab_question_enable.png';
          break;
    }
  }
}
