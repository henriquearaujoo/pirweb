import { Subject } from 'rxjs/Subject';
import { Reception } from './../../../../models/reception';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {

  private reception: Reception =  new Reception();
  @Input() chapterId: any;
  @Input() parentSubject: Subject<any>;

  constructor() { }

  ngOnInit() {

  }

  saveData(isNewData: boolean , chapterId: any) {

  }

}
