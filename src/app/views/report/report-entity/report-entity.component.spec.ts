import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEntityComponent } from './report-entity.component';

describe('ReportEntityComponent', () => {
  let component: ReportEntityComponent;
  let fixture: ComponentFixture<ReportEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
