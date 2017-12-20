import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWaitingAnswerComponent } from './modal-waiting-answer.component';

describe('ModalWaitingAnswerComponent', () => {
  let component: ModalWaitingAnswerComponent;
  let fixture: ComponentFixture<ModalWaitingAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWaitingAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWaitingAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
