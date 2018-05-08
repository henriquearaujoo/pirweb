import { Permissions, RuleState } from './../../../../helpers/permissions';
import { LoaderService } from './../../../../services/loader/loader.service';
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
import { IFormCanDeActivate } from '../../../../guards/iform-candeactivate';
import { ModalService } from '../../../../components/modal/modal.service';
import { MultimediaComponent } from '../multimedia/multimedia.component';

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
  private multimediaTab: string;
  private isNewData: boolean;
  private previousTab: string;
  private currentTab: number;
  private nextTab: string;
  private next: string;
  private enable_save: boolean;
  private currentChapter: any;
  public  canChangePage = false;
  private urlId: string;
  // private openModalButton: HTMLButtonElement;
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private showModal: boolean;

  @ViewChild('informationChild')
  information: InformationComponent;
  @ViewChild('receptionChild')
  reception: ReceptionComponent;
  @ViewChild('intervention')
  intervention: InterventionComponent;
  @ViewChild('conclusion')
  conclusion: ConclusionComponent;
  @ViewChild('multimedia')
  multimedia: MultimediaComponent;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastService: ToastService,
    private modalService: ModalService,
    private loaderService: LoaderService,
    private permissions: Permissions) { }

  ngOnInit() {
    this.permissions.canActivate(['/capitulos/registro']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );

    this.informationTab = './assets/img/chapter/ic_chapter_tab_information_enable.png';
    this.receptionTab = './assets/img/chapter/ic_chapter_tab_reception_disable.png';
    this.interventionTab = './assets/img/chapter/ic_chapter_tab_intervention_disable.png';
    this.conclusionTab = './assets/img/chapter/ic_chapter_tab_conclusion_disable.png';
    this.multimediaTab = './assets/img/chapter/ic_chapter_tab_multimedia_disable.png';

    /*check if is a new or update*/
    this.isNewData = true;
    this.urlId = localStorage.getItem('_chapterId');
    if (this.urlId !== null && this.urlId !== '') {
      this.isNewData = false;
      this.information.isNewData = false;
      this.reception.isNewData = false;
      this.intervention.isNewData = false;
      this.conclusion.isNewData = false;
      this.multimedia.isNewData = false;
      this.sendEventToLoad();
    }else {
      this.information.isNewData = true;
      this.reception.isNewData = true;
      this.intervention.isNewData = true;
      this.conclusion.isNewData = true;
      this.multimedia.isNewData = true;
      this.getChapterNumber();
    }
  }

  getChapterNumber() {
    this.loaderService.show();
    this.information.getNextChapterNumber().subscribe(
      success => {
        this.chapterList = success;

        const hash = {};
        this.chapterList = this.chapterList.filter(chapter => {
          const exists = !hash[chapter.number] || false;
          hash[chapter.number] = true;
          return exists;
        });

        this.chapter.number = this.chapterList.length + 1;
        // * VERSION *
        const chapterNumber = localStorage.getItem('chapterNumber');
        if (chapterNumber) {
          this.currentChapter = chapterNumber;
          localStorage.removeItem('chapterNumber');
          this.loaderService.hide();
        } else {
          this.currentChapter = this.chapter.number;
          this.loaderService.hide();
        }
        this.information.number = this.currentChapter;
      },
      e => {
        console.log('error: ' + e);
        this.loaderService.hide();
      }
    );
  }
  /*****************SELECT******************/
  sendEventToLoad() {
    this.loaderService.show();
    this.information.load(this.urlId).subscribe(
      s => {
        this.chapter = s;

        this.information.loadForm(s);
        this.currentChapter = this.chapter.number;
        this.reception.load(this.urlId);
        this.intervention.load(this.urlId);
        this.conclusion.load(this.urlId);
        this.multimedia.load(this.urlId);

        this.loaderService.hide();
      },
      e => {
        console.log('Error: ' + e);
        this.loaderService.hide();
      }
    );
  }
  /****Return of Event from children components ****/
  actionInformation(c: Chapter) {
      if ( c !== null) {
        this.chapter.id = c.id;
        // add id in all components
        this.reception.chapter = c.id;
        this.intervention.chapter = c.id;
        this.conclusion.chapter = c.id;
        this.multimedia.chapter_id = c.id;
        this.multimedia.load(c.id);
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

  walk ( tab: number) {
    switch (tab) {
      case 0:
        this.informationTab = './assets/img/chapter/ic_chapter_tab_information_enable.png';
        this.receptionTab = './assets/img/chapter/ic_chapter_tab_reception_disable.png';
        this.interventionTab = './assets/img/chapter/ic_chapter_tab_intervention_disable.png';
        this.conclusionTab = './assets/img/chapter/ic_chapter_tab_conclusion_disable.png';
        this.multimediaTab = './assets/img/chapter/ic_chapter_tab_multimedia_disable.png';
      break;
      case 1:
        this.informationTab = './assets/img/chapter/ic_chapter_tab_information_disable.png';
        this.receptionTab = './assets/img/chapter/ic_chapter_tab_reception_enable.png';
        this.interventionTab = './assets/img/chapter/ic_chapter_tab_intervention_disable.png';
        this.conclusionTab = './assets/img/chapter/ic_chapter_tab_conclusion_disable.png';
        this.multimediaTab = './assets/img/chapter/ic_chapter_tab_multimedia_disable.png';
      break;
      case 2:
        this.informationTab = './assets/img/chapter/ic_chapter_tab_information_disable.png';
        this.receptionTab = './assets/img/chapter/ic_chapter_tab_reception_disable.png';
        this.interventionTab = './assets/img/chapter/ic_chapter_tab_intervention_enable.png';
        this.conclusionTab = './assets/img/chapter/ic_chapter_tab_conclusion_disable.png';
        this.multimediaTab = './assets/img/chapter/ic_chapter_tab_multimedia_disable.png';
      break;
      case 3:
        this.informationTab = './assets/img/chapter/ic_chapter_tab_information_disable.png';
        this.receptionTab = './assets/img/chapter/ic_chapter_tab_reception_disable.png';
        this.interventionTab = './assets/img/chapter/ic_chapter_tab_intervention_disable.png';
        this.conclusionTab = './assets/img/chapter/ic_chapter_tab_conclusion_enable.png';
        this.multimediaTab = './assets/img/chapter/ic_chapter_tab_multimedia_disable.png';
      break;
      case 4:
        this.informationTab = './assets/img/chapter/ic_chapter_tab_information_disable.png';
        this.receptionTab = './assets/img/chapter/ic_chapter_tab_reception_disable.png';
        this.interventionTab = './assets/img/chapter/ic_chapter_tab_intervention_disable.png';
        this.conclusionTab = './assets/img/chapter/ic_chapter_tab_conclusion_disable.png';
        this.multimediaTab = './assets/img/chapter/ic_chapter_tab_multimedia_enable.png';
      break;
    }
  }

  openModal() {
   this.modalService.modalCancel('/capitulos');
  }

}
