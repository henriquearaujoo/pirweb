import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-information',
  templateUrl: './help-information.component.html',
  styleUrls: ['./help-information.component.css']
})
export class HelpInformationComponent implements OnInit {

  // private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private pageActive = 0;
  constructor() { }

  ngOnInit() {
  }

  setPage(page) {
    this.pageActive = page;
    console.log(page);
  }

}
