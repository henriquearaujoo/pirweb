import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineRulesComponent } from './define-rules.component';

describe('DefineRulesComponent', () => {
  let component: DefineRulesComponent;
  let fixture: ComponentFixture<DefineRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
