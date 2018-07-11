import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UcListComponent } from './uc-list.component';

describe('UcListComponent', () => {
  let component: UcListComponent;
  let fixture: ComponentFixture<UcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
