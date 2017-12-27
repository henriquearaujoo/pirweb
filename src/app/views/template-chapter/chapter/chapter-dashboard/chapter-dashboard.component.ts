import { ToastService } from './../../../../services/toast-notification/toast.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Chapter } from './../../../../models/chapter';

import { InterventionComponent } from './../intervention/intervention.component';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { ReceptionComponent } from '../reception/reception.component';
import { EventEmitter } from 'events';
import { InformationComponent } from '../information/information.component';
import { ConclusionComponent } from '../conclusion/conclusion.component';

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
  private openModalButton: HTMLButtonElement;
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};

  @ViewChild('informationChild')
  information: InformationComponent;
  @ViewChild('receptionChild')
  reception: ReceptionComponent;
  @ViewChild('intervention')
  intervention: InterventionComponent;
  @ViewChild('conclusion')
  conclusion: ConclusionComponent;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastService: ToastService) { }

  ngOnInit() {

    this.openModalButton = (<HTMLButtonElement>document.getElementById('openModalButton'));
    this.openModalButton.style.display = 'none';

    this.informationTab = '../../../assets/img/chapter/ic_chapter_tab_information_enable.png';
    this.receptionTab = '../../../assets/img/chapter/ic_chapter_tab_reception_disable.png';
    this.interventionTab = '../../../assets/img/chapter/ic_chapter_tab_intervention_disable.png';
    this.conclusionTab = '../../../assets/img/chapter/ic_chapter_tab_conclusion_disable.png';

    /*check if is a new or update*/
    this.isNewData = true;
    this.urlId = localStorage.getItem('chapterId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      this.information.isNewData = false;
      this.reception.isNewData = false;
      this.intervention.isNewData = false;
      this.conclusion.isNewData = false;
      this.sendEventToLoad();
    }else {
      this.information.isNewData = true;
      this.reception.isNewData = true;
      this.intervention.isNewData = true;
      this.conclusion.isNewData = true;
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
    this.information.load(this.urlId).subscribe(
      s => {
        this.chapter = s;

        this.information.loadForm(s);
        this.currentChapter = this.chapter.number;
        this.reception.load(this.urlId);
        this.intervention.load(this.urlId);
        this.conclusion.load(this.urlId);
      },
      e => {
        console.log('Error: ' + e);
      }
    );
  }
  /****Return of Event from children components ****/
  actionInformation(c: Chapter) {
      if ( c !== null ) {
        this.chapter.id = c.id;
        // add id in all components
        this.reception.chapter = c.id;
        this.intervention.chapter = c.id;
        this.conclusion.chapter = c.id;
        this.toastService.toastSuccess();
        return;
      }
      this.toastService.toastErrorLabel();
  }
  /****Return of Event from children components ****/
  actionSave(status: boolean) {
    if (status) {
      this.toastService.toastSuccess();
    } else {
      this.toastService.toastErrorChapterId();
    }
  }

  openModal() {
    this.openModalButton.click();
  }

  walk ( tab: number) {
    switch (tab) {
      case 0:
        this.informationTab = '../../../assets/img/chapter/ic_chapter_tab_information_enable.png';
        this.receptionTab = '../../../assets/img/chapter/ic_chapter_tab_reception_disable.png';
        this.interventionTab = '../../../assets/img/chapter/ic_chapter_tab_intervention_disable.png';
        this.conclusionTab = '../../../assets/img/chapter/ic_chapter_tab_conclusion_disable.png';
      break;
      case 1:
        this.informationTab = '../../../assets/img/chapter/ic_chapter_tab_information_disable.png';
        this.receptionTab = '../../../assets/img/chapter/ic_chapter_tab_reception_enable.png';
        this.interventionTab = '../../../assets/img/chapter/ic_chapter_tab_intervention_disable.png';
        this.conclusionTab = '../../../assets/img/chapter/ic_chapter_tab_conclusion_disable.png';
      break;
      case 2:
        this.informationTab = '../../../assets/img/chapter/ic_chapter_tab_information_disable.png';
        this.receptionTab = '../../../assets/img/chapter/ic_chapter_tab_reception_disable.png';
        this.interventionTab = '../../../assets/img/chapter/ic_chapter_tab_intervention_enable.png';
        this.conclusionTab = '../../../assets/img/chapter/ic_chapter_tab_conclusion_disable.png';
      break;
      case 3:
        this.informationTab = '../../../assets/img/chapter/ic_chapter_tab_information_disable.png';
        this.receptionTab = '../../../assets/img/chapter/ic_chapter_tab_reception_disable.png';
        this.interventionTab = '../../../assets/img/chapter/ic_chapter_tab_intervention_disable.png';
        this.conclusionTab = '../../../assets/img/chapter/ic_chapter_tab_conclusion_enable.png';
      break;
    }
  }

  modalConfirm() {
    this.router.navigate(['/template-chapter']);
    }
}
