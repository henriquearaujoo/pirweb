import { ToastService } from './../../../../services/toast-notification/toast.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Chapter } from './../../../../models/chapter';

import { InterventionComponent } from './../intervention/intervention.component';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ReceptionComponent } from '../reception/reception.component';
import { EventEmitter } from 'events';
import { InformationComponent } from '../information/information.component';

@Component({
  selector: 'app-chapter-dashboard',
  templateUrl: './chapter-dashboard.component.html',
  styleUrls: ['./chapter-dashboard.component.css'],
})

export class ChapterDashboardComponent implements OnInit {

  private chapterList: Chapter[] = new Array();
  private chapter = new Chapter();
  private informationTab: string;
  private receptionTab: string;
  private conclusionTab: string;
  private interventionTab: string;
  private isNewData: boolean;
  private previousTab: string;
  private currentTab: number;
  private nextTab: string;
  private next: string;
  private enable_save: boolean;
  private currentChapter: any;
  private urlId: string;

  @ViewChild('informationChild')
  information: InformationComponent;
  @ViewChild('receptionChild')
  reception: ReceptionComponent;
  @ViewChild('intervention')
  intervention: InterventionComponent;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastService: ToastService) { }

  ngOnInit() {
    this.currentTab = 0;

    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';

    this.informationTab = '../../../assets/img/chapter/ic_chapter_tab_information_enable.png';
    this.receptionTab = '../../../assets/img/chapter/ic_chapter_tab_reception_disable.png';
    this.interventionTab = '../../../assets/img/chapter/ic_chapter_tab_intervention_disable.png';
    this.conclusionTab = '../../../assets/img/chapter/ic_chapter_tab_question_disable.png';

    /*check if is a new or update*/
    this.isNewData = true;
    this.urlId = this.activeRoute.snapshot.paramMap.get('id');
    if (this.urlId !== null) {
      this.isNewData = false;
      this.information.isNewData = false;
      this.reception.chapter = this.urlId;
      this.sendEventToLoad();
    }else {
      this.information.isNewData = true;
      this.getChapterNumber();
    }
  }

  getChapterNumber() {
    this.information.getNextChapterNumber().subscribe(
      success => {
        this.chapterList = success;
        this.chapter.number = this.chapterList.length + 1;
        this.currentChapter = this.chapter.number;
        this.information.number = this.currentChapter;
      },
      e => {
        console.log('error: ' + e);
      }
    );
  }
  /*****************SELECT******************/
  sendEventToLoad() {
    this.information.load(this.urlId + '==').subscribe(
      s => {
        this.chapter = s;
        this.information.loadForm(s);
        this.currentChapter = this.chapter.number;
      },
      e => {
        console.log('Error: ' + e);
      }
    );

    this.reception.load(this.urlId + '==');
    this.intervention.load(this.urlId + '==');
  }

  /*
    true = next
    false = previuos
  */
  walk(tab: boolean) {

    if (tab) {
      if (this.currentTab === -1) {
        this.currentTab = 0;
      } else if (this.currentTab < 3) {
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
