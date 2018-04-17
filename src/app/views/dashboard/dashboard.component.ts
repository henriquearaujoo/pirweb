import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private hasdata = true;
  private chartDataSource: any[];
  private chartId = 'chartId';
  private chartTitle = '';
  private arrayMonths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  private chartLabel: Array<any> = this.arrayMonths;
  public chartData: any[] = [{data: [], label: ''}];
  public chartColors: any[] = [{ backgroundColor: '#6db3de' }];
  private chartType = 'bar';
  private from = '';
  private to = '';
  private filter: any = {type: ''};
  private date = new Date();
  private today: string;
  constructor() { }

  ngOnInit() {
  }

  changeChart(event) {}

  onChangesChart() {
    let cloneData = JSON.parse(JSON.stringify(this.chartData));
    cloneData = this.chartData;
    this.chartData = cloneData;

    let cloneType = JSON.parse(JSON.stringify(this.chartType));
    cloneType = this.chartType;
    this.chartType = cloneType;
  }

  getData() {
    switch (this.filter.type) {
      case '1':
      this.chartLabel = ['label 01', 'label 02', 'label 03'];
      this.chartData = [{data: [3, 20, 10], label: 'A'}];
      break;
      case '2':
      this.chartLabel = this.arrayMonths;
      this.chartData = [ {data: [65, 59, 80, 18, 56, 55, 30, 10, 5, 11], label: 'B'} ];
      break;
      default:
      this.chartLabel = this.arrayMonths;
      this.chartData = [ {data: [65, 59, 80, 81, 56, 55, 40], label: 'C'} ];
      break;
    }
    let cloneData = JSON.parse(JSON.stringify(this.chartData));
    cloneData = this.chartData;
    this.chartData = cloneData;
  }

  getDate() {
    // Today
    this.date.setMinutes( this.date.getMinutes() + this.date.getTimezoneOffset() );
    const currentMonth = ('0' + (this.date.getMonth() + 1)).slice(-2);
    const currentDay = ('0' + this.date.getDate()).slice(-2);
    this.today = this.date.getFullYear() + '-' + currentMonth + '-' + currentDay;
 }
}
