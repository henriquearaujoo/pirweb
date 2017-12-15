import { InterventionService } from './../../../../services/intervention/intervention.service';
import { Intervention } from './../../../../models/intervention';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})

export class InterventionComponent implements OnInit {
  private intervention: Intervention;

  constructor(private service: InterventionService) { }

  ngOnInit() {
    this.intervention = new Intervention();
  }

  saveData(isNewData: boolean) {
    if (isNewData) {
      this.service.insert(this.intervention).subscribe(
        success => {

        }
      );
    }else {
      this.service.update(this.intervention).subscribe(
        success => {

        }
      );
    }
  }

  load() {
    // this.service.load(this.chapterId).subscribe(
    //   success => {
    //       this.intervention = success;
    //   }
    //);
  }
}
