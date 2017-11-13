import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSelectModelComponent } from './template-select-model.component';

describe('TemplateSelectModelComponent', () => {
  let component: TemplateSelectModelComponent;
  let fixture: ComponentFixture<TemplateSelectModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateSelectModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSelectModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
