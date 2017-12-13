import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-personal-information',
  templateUrl: './user-personal-information.component.html',
  styleUrls: ['./user-personal-information.component.css']
})
export class UserPersonalInformationComponent implements OnInit {

  accountTab: string;
  personalTab: string;
  adressTab: string;
  currentTab: number;
  previousTab: string;
  nextTab: string;
  next: string;

  constructor() { }

  ngOnInit() {
    this.currentTab = 0;
    this.previousTab = '#tab_1';
    this.nextTab = '#tab_2';
    this.accountTab = '../../../assets/img/user/ic_account_enable.png';
    this.personalTab = '../../../assets/img/user/ic_personal_disable.png';
    this.adressTab = '../../../assets/img/user/ic_adress_disable.png';
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
