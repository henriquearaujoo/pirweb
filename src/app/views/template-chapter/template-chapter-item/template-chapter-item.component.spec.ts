import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateChapterItemComponent } from './template-chapter-item.component';

describe('TemplateItemComponent', () => {
  let component: TemplateChapterItemComponent;
  let fixture: ComponentFixture<TemplateChapterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateChapterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateChapterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
