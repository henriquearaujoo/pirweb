import { Permissions, RuleState } from './../../../helpers/permissions';
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
  public performanceData: any[] = [{data: [], label: 'Nº de Visistas'}];
  public performanceColors: any[] = [{ backgroundColor: '#4E6D80' }];
  private chartType = 'bar';
  private from = '';
  private to = '';
  private d1 = new Date();
  private d2: Date;
  private filter: any = {type: ''};
  private date = new Date();
  private today: string;
  private canRead: boolean;
  private canUpdate: boolean;
  private canCreate: boolean;
  private canDelete: boolean;
  constructor(
    private permissions: Permissions
  ) { }

  ngOnInit() {
    this.permissions.canActivate(['/agent-performance']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
        this.canCreate = rules.canCreate;
        this.canUpdate = rules.canUpdate;
        this.canRead = rules.canRead;
        this.canDelete = rules.canDelete;
      }
    );
  }

  changeChart(event) {}

  changeDate(event) {
    console.log(event.target.value);
    this.d2 = new Date();
    this.d1 = new Date(this.d1);
    console.log(this.d1);
    console.log(this.d2);
    this.d2.setDate(this.d1.getDate() + 7 );

  }

  getPerformance() {
    switch (this.filter.type) {
      case '1':
      if ( (this.from !== undefined && this.from !== '') && (this.to !== undefined && this.to !== '')) {
        const currentFrom = this.from.split('-')[2] + '-' + this.from.split('-')[1] + '-' + this.from.split('-')[0];
        const currentTo = this.to.split('-')[2] + '-' + this.to.split('-')[1] + '-' + this.to.split('-')[0];
        this.performanceLabel = [currentFrom + ' ~ ' + currentTo];
        this.performanceData = [ {data: [15], label: 'Nº de Visistas'} ];
      } else {
        this.performanceLabel = [' ~ '];
        this.performanceData = [{data: [0], label: 'Nº de Visistas'}];
      }
      break;
      case '2':
      this.performanceLabel = this.arrayMonths;
      this.performanceData = [ {data: [65, 59, 80, 81, 56, 55, 40], label: 'Nº de Visistas'} ];
      break;
      default:
      this.performanceLabel = this.arrayMonths;
      this.performanceData = [ {data: [65, 59, 80, 81, 56, 55, 40], label: 'Nº de Visistas'} ];
      break;
    }
    let cloneData = JSON.parse(JSON.stringify(this.performanceData));
    cloneData = this.performanceData;
    this.performanceData = cloneData;
  }

  getDate() {
    // Today
    this.date.setMinutes( this.date.getMinutes() + this.date.getTimezoneOffset() );
    const currentMonth = ('0' + (this.date.getMonth() + 1)).slice(-2);
    const currentDay = ('0' + this.date.getDate()).slice(-2);
    this.today = this.date.getFullYear() + '-' + currentMonth + '-' + currentDay;
 }
}
