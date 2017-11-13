import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateOptionCardComponent } from './template-option-card.component';

describe('TemplateOptionCardComponent', () => {
  let component: TemplateOptionCardComponent;
  let fixture: ComponentFixture<TemplateOptionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateOptionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateOptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
