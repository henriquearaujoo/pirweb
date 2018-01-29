import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['../login.component.css']
})
export class SendEmailComponent implements OnInit {

  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};
  private user: any = { email: ''};
  constructor() {
   }

  ngOnInit() {
  }

}
