import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimediaPickerComponent } from './multimedia-picker.component';

describe('MultimediaPickerComponent', () => {
  let component: MultimediaPickerComponent;
  let fixture: ComponentFixture<MultimediaPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultimediaPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultimediaPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
