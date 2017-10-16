import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-item',
  templateUrl: './template-item.component.html',
  styleUrls: ['./template-item.component.css']
})
export class TemplateItemComponent implements OnInit {
  
  subtitle : string;
  describe : string;
  subdescribe : string;
  imgSource : string;

  constructor() {
    this.subtitle = 'Subtitle';
    this.describe = 'describe';
    this.subdescribe = 'subdescribe';
    this.imgSource = 'https://avatars2.githubusercontent.com/u/139426?s=400&v=4';
   }

  ngOnInit() {
  }

}
