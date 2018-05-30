import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportChartComponent } from './report-chart.component';

describe('ReportChartComponent', () => {
  let component: ReportChartComponent;
  let fixture: ComponentFixture<ReportChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
