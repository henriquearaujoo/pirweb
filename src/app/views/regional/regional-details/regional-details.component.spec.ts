import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalDetailsComponent } from './regional-details.component';

describe('RegionalDetailsComponent', () => {
  let component: RegionalDetailsComponent;
  let fixture: ComponentFixture<RegionalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
