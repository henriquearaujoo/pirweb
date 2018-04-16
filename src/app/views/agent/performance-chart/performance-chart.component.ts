import { Types } from './../../../models/types';
import { Component, OnInit } from '@angular/core';
import { IMyDate, IMyDateModel, IMyInputFieldChanged, IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent implements OnInit {
  private hasdata = true;
  private performanceDataSource: any[];
  private performanceId = 'performanceId';
  private performanceTitle = 'Gráfico de Desempenho';
  private arrayMonths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  private performanceLabel: Array<any> = this.arrayMonths;
  public performanceData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40]}
  ];
  // public performanceColors: any[] = [{ backgroundColor: ['#d73925', '#f39c12', 'rgb(108, 180, 108)'] }];
  private from = '';
  private to = '';
  private filter: any = {type: ''};
  private date = new Date();
  private today: string;
  constructor() { }

  ngOnInit() {
  }

  changeChart(event) {}

  getPerformance() {
    console.log(this.filter.type);
    switch (this.filter.type) {
      case '1':
      this.performanceLabel = [this.from + ' ~ ' + this.to ];
      this.performanceData = [ 6 ];
      console.log(this.performanceLabel);
      break;
      case '2':
      this.performanceLabel = this.arrayMonths;
      this.performanceData = [ {data: [65, 59, 80, 81, 56, 55, 40]} ];
      break;
      default:
      this.performanceLabel = this.arrayMonths;
      this.performanceData = [ {data: [65, 59, 80, 81, 56, 55, 40]} ];
      break;
    }
    let cloneData = JSON.parse(JSON.stringify(this.performanceData));
    cloneData = this.performanceData;
    this.performanceData = cloneData;

    let cloneLabel = JSON.parse(JSON.stringify(this.performanceLabel));
    cloneLabel = this.performanceLabel;
    this.performanceLabel = cloneLabel;
    console.log(cloneLabel);
  }

  getDate() {
    // Today
    this.date.setMinutes( this.date.getMinutes() + this.date.getTimezoneOffset() );
    const currentMonth = ('0' + (this.date.getMonth() + 1)).slice(-2);
    const currentDay = ('0' + this.date.getDate()).slice(-2);
    this.today = this.date.getFullYear() + '-' + currentMonth + '-' + currentDay;
 }
}
