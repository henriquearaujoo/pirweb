import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-report-chart',
  templateUrl: './report-chart.component.html',
  styleUrls: ['./report-chart.component.css']
})
export class ReportChartComponent implements OnInit {

  @Input() headerShower: any;
  @Input() headerList: any;
  @Input() pagedItems: any;

  private dataChartData: Array<any> = [
    {data: [0], label: 'Selecione uma entidade'},
  ];

  private dataChartLabels: Array<any> = [ '' ];
  private dataChartOptions: any = {
    responsive: true,
    legend: { position: 'bottom' }
  };
  private dataChartLegend = true;
  private dataChartType = 'bar';

  constructor() { }

  ngOnInit() {
  }

  public randomize(): void {
    const _dataChartData: Array<any> = new Array(this.dataChartData.length);
    for (let i = 0; i < this.dataChartData.length; i++) {
      _dataChartData[i] = {data: new Array(this.dataChartData[i].data.length), label: this.dataChartData[i].label};
      for (let j = 0; j < this.dataChartData[i].data.length; j++) {
        _dataChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.dataChartData = _dataChartData;
  }

  private chartType(type) {
    this.dataChartType = type;
  }

  public showChart(data, groupedList) {
    this.dataChartLabels = new Array();

    let index = 1;
    data.forEach(node => {
      this.dataChartLabels.push(groupedList[0].alias + '_' + index);
      index++;
    });

    const count = this.dataChartData.length;
    for (let i = 0; i < count; i++) {
      this.dataChartData.splice(0, 1);
    }

    data.forEach(curr => {
      const keys = Object.keys(curr);
      const vKey = Object.values(keys);
      const entities = Object.keys(Object.values(curr)[1]);
      entities.forEach(o => {
        const len = Object.values(curr)[1][o].length;
        const idx = groupedList.findIndex(u => u.entity === o);
        const i = this.dataChartData.findIndex(u => u.label === groupedList[idx].alias);
        if (i === -1) {
          this.dataChartData.push({data: [len], label: groupedList[idx].alias});
        }else {
          this.dataChartData[i].data.push(len);
        }
      });
    });
  }
}
