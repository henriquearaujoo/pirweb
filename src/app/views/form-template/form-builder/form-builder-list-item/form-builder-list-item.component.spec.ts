import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderListItemComponent } from './form-builder-list-item.component';

describe('FormBuilderListItemComponent', () => {
  let component: FormBuilderListItemComponent;
  let fixture: ComponentFixture<FormBuilderListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBuilderListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
