import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformationAccountComponent } from './user-information-account.component';

describe('UserInformationAccountComponent', () => {
  let component: UserInformationAccountComponent;
  let fixture: ComponentFixture<UserInformationAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInformationAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInformationAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
