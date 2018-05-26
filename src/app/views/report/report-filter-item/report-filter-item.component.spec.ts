import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFilterItemComponent } from './report-filter-item.component';

describe('ReportFilterItemComponent', () => {
  let component: ReportFilterItemComponent;
  let fixture: ComponentFixture<ReportFilterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFilterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFilterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
