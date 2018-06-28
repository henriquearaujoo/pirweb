import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderListComponent } from './form-builder-list.component';

describe('FormBuilderListComponent', () => {
  let component: FormBuilderListComponent;
  let fixture: ComponentFixture<FormBuilderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBuilderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
