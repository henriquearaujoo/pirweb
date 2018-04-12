import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitHistoricListComponent } from './visit-historic-list.component';

describe('VisitHistoricListComponent', () => {
  let component: VisitHistoricListComponent;
  let fixture: ComponentFixture<VisitHistoricListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitHistoricListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitHistoricListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
