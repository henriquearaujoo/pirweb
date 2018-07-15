import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UcDetailsComponent } from './uc-details.component';

describe('UcDetailsComponent', () => {
  let component: UcDetailsComponent;
  let fixture: ComponentFixture<UcDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
