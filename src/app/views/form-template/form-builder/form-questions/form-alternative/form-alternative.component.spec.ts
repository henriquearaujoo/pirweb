import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAlternativeComponent } from './form-alternative.component';

describe('FormAlternativeComponent', () => {
  let component: FormAlternativeComponent;
  let fixture: ComponentFixture<FormAlternativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAlternativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
