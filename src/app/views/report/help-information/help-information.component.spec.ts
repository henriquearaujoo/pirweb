import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpInformationComponent } from './help-information.component';

describe('HelpInformationComponent', () => {
  let component: HelpInformationComponent;
  let fixture: ComponentFixture<HelpInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
