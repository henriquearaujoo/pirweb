import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLocationComponent } from './agent-location.component';

describe('LocationAgentComponent', () => {
  let component: AgentLocationComponent;
  let fixture: ComponentFixture<AgentLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
