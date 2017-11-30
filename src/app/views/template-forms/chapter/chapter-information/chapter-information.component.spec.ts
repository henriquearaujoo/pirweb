import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterInformationComponent } from './chapter-information.component';

describe('ChapterInformationComponent', () => {
  let component: ChapterInformationComponent;
  let fixture: ComponentFixture<ChapterInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
