import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PagenateComponent } from '../../components/pagenate/pagenate.component';
import { PageService } from '../../services/pagenate/page.service';
import { CostumerService } from '../../services/costumer/costumer.service';

@Component({
  selector: 'app-costumer-list',
  templateUrl: './costumer.component.html',
  styleUrls: ['./costumer.component.css']
})
export class CostumerComponent extends PagenateComponent implements OnInit {
  costumers = new Array();
  hasdata : boolean;


  constructor(pagerService: PageService, private costumerService : CostumerService, private router: Router) {
    super(pagerService);
  }

  ngOnInit() {
    this.getCostumers();
    this.hasdata = false;
  }

  getCostumers() {
    this.costumerService.getCostumers().subscribe(
      success => {
        if (success == null) {
          this.hasdata = false;
        }
        this.costumers = success;
        this.allItems = this.costumers;
        this.setPage(1);
        this.hasdata = true;
      },
      error => console.log(error)
    );
  }
}
