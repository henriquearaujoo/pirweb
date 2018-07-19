import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnanciesComponent } from './pregnancies.component';

describe('PregnanciesComponent', () => {
  let component: PregnanciesComponent;
  let fixture: ComponentFixture<PregnanciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregnanciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
