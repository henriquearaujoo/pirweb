import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterDashboardComponent } from './chapter-dashboard.component';

describe('ChapterDashboardComponent', () => {
  let component: ChapterDashboardComponent;
  let fixture: ComponentFixture<ChapterDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
