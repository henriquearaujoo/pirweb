import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateChapterComponent } from './template-chapter.component';

describe('TemplateChapterComponent', () => {
  let component: TemplateChapterComponent;
  let fixture: ComponentFixture<TemplateChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
