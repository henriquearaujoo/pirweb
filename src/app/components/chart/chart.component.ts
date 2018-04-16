import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
// import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() typeCharts: any;
  @Input() dataSource: any[];
  @Input() labels = [];
  @Input() data;
  @Input() id;
  @Input() title;
  @Input() chartColors;
  @Input() legend = false;
  private chartLegend = true;

  @Output() changeChart = new EventEmitter();

  private chartType = 'bar';
  private chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'bottom'
    }
  };

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }

}
