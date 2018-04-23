import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMapComponent } from './agent-map.component';

describe('AgentMapComponent', () => {
  let component: AgentMapComponent;
  let fixture: ComponentFixture<AgentMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
