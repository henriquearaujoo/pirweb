import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() chartType: any = 'bar';
  @Input() dataSource: any[];
  @Input() labels = [];
  @Input() data;
  @Input() id;
  @Input() title = '';
  @Input() chartColors;
  @Input() legend = false;
  private chartLegend = true;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  @Output() changeChart = new EventEmitter();

  private chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: this.title,
      position: 'left'
  }
  };

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges( changes: SimpleChanges) {
    console.log('ngOnChanges', changes);
    if (changes.labels) {
      console.log('changes', this.labels);
      let cloneLabel = JSON.parse(JSON.stringify(this.labels));
      if (this.chart.chart !== undefined) {
        this.chart.chart.config.data.labels = cloneLabel;
        cloneLabel = this.chart.labels;
        this.labels = cloneLabel;
      }
    }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }

}
