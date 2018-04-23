import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitHistoricComponent } from './visit-historic.component';

describe('VisitHistoricComponent', () => {
  let component: VisitHistoricComponent;
  let fixture: ComponentFixture<VisitHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
