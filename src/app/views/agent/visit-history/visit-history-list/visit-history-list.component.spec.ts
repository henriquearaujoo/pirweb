import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitHistoryListComponent } from './visit-history-list.component';

describe('VisitHistoryListComponent', () => {
  let component: VisitHistoryListComponent;
  let fixture: ComponentFixture<VisitHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
