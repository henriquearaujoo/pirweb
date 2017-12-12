import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapter-dashboard',
  templateUrl: './chapter-dashboard.component.html',
  styleUrls: ['./chapter-dashboard.component.css']
})
export class ChapterDashboardComponent implements OnInit {

  private accountTab: string;
  private personalTab: string;
  private adressTab: string;
  private currentTab: number;
  private previousTab: string;
  private nextTab: string;
  private next: string;
  private enable_save: boolean;
  private currentChapter: string;

  constructor() { }

  ngOnInit() {
    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';
    this.accountTab = '../../../assets/img/user/ic_account_enable.png';
    this.personalTab = '../../../assets/img/user/ic_personal_disable.png';
    this.adressTab = '../../../assets/img/user/ic_adress_disable.png';
    this.currentChapter = 'Capítulo x';
    this.enable_save = false;
  }

  isActive(tab: boolean) {
    if (tab) {
      if (this.currentTab === -1) {
            this.currentTab = 0;
      } else if (this.currentTab < 2) {
            this.currentTab++;
        }
    }else {
      if (this.currentTab > 0) {
            this.currentTab--;
          }
    }
    this.previousTab = '#tab_' + (this.currentTab + 1);
    this.nextTab = '#tab_' + (this.currentTab + 1);

    if (this.nextTab === '#tab_3') {
      this.enable_save = true;
    } else {
      this.enable_save = false;
    }

    if (this.currentTab === 0) {
      this.accountTab = '../../../assets/img/user/ic_account_enable.png';
      this.personalTab = '../../../assets/img/user/ic_personal_disable.png';
      this.adressTab = '../../../assets/img/user/ic_adress_disable.png';
    }else if (this.currentTab === 1) {
      this.accountTab = '../../../assets/img/user/ic_account_disable.png';
      this.personalTab = '../../../assets/img/user/ic_personal_enable.png';
      this.adressTab = '../../../assets/img/user/ic_adress_disable.png';
    }else {
      this.accountTab = '../../../assets/img/user/ic_account_disable.png';
      this.personalTab = '../../../assets/img/user/ic_personal_disable.png';
      this.adressTab = '../../../assets/img/user/ic_adress_enable.png';
      this.next = 'Salvar';
    }
  }
}
