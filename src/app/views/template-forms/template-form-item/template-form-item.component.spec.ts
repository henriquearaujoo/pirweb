import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormItemComponent } from './template-form-item.component';

describe('TemplateFormItemComponent', () => {
  let component: TemplateFormItemComponent;
  let fixture: ComponentFixture<TemplateFormItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFormItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
